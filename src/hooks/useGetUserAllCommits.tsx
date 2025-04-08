// hooks/useUserCommits.ts
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import { addDays, differenceInDays, format, subDays } from 'date-fns';

export interface CommitDayData {
    date: string;
    count: number;
}

type Filter = '7' | '30' | '365' | 'all';

export const useGetUserAllCommits = (username: string, filter: Filter) => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useGetUserAllCommits must be used within an AppContextProvider');
    }

    const { userCommits, setUserCommits } = context;
    const [filteredCommits, setFilteredCommits] = useState<CommitDayData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCommits = async () => {
            setLoading(true);
            try {
                const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`, {
                    headers: {
                        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                    },
                });

                const repos = reposRes.data;
                const allDates: string[] = [];

                await Promise.all(
                    repos.map(async (repo: any) => {
                        let page = 1;
                        const perPage = 100;

                        try {
                            while (true) {
                                const res = await axios.get(
                                    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=${perPage}&page=${page}`,
                                    {
                                        headers: {
                                            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                                        },
                                    }
                                );
                                const commits = res.data;
                                if (!commits.length) break;

                                commits.forEach((commit: any) => {
                                    if (commit.commit?.author?.date) {
                                        const date = commit.commit.author.date.split('T')[0];
                                        allDates.push(date);
                                    }
                                });

                                if (commits.length < perPage) break;
                                page++;
                            }
                        } catch (err: any) {
                            if (err.response?.status !== 409) {
                                console.error(`Error fetching commits from ${repo.name}`, err);
                            }
                        }
                    })
                );

                const grouped: Record<string, number> = {};
                allDates.forEach(date => {
                    grouped[date] = (grouped[date] || 0) + 1;
                });

                const sortedDates = Object.keys(grouped).sort();
                if (sortedDates.length === 0) {
                    setUserCommits([]);
                    return;
                }

                const start = new Date(sortedDates[0]);
                const end = new Date(sortedDates[sortedDates.length - 1]);
                const days = differenceInDays(end, start);

                const fullData: CommitDayData[] = [];
                for (let i = 0; i <= days; i++) {
                    const date = format(addDays(start, i), 'yyyy-MM-dd');
                    fullData.push({ date, count: grouped[date] || 0 });
                }

                setUserCommits(fullData);
            } catch (err) {
                console.error('Failed to fetch commits:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCommits();
    }, [username]);

    useEffect(() => {
        if (!userCommits) return;

        if (filter === 'all') {
            setFilteredCommits(userCommits);
        } else {
            const daysBack = filter === '7' ? 7 : filter === '30' ? 30 : 365;
            const fromDate = subDays(new Date(), daysBack);
            const filtered = userCommits.filter(d => new Date(d.date) >= fromDate);
            setFilteredCommits(filtered);
        }
    }, [filter, userCommits]);

    return { filteredCommits, total: filteredCommits.reduce((sum, d) => sum + d.count, 0), loading };
};


export default useGetUserAllCommits;