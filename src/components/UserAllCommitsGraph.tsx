import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import { useParams } from 'react-router-dom';
import { format, addDays, differenceInDays, subDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';

interface Commit {
    commit: {
        author: {
            date: string;
        };
    };
}

interface CommitDayData {
    date: string;
    count: number;
}

const UserAllCommitsGraph: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [commitData, setCommitData] = useState<CommitDayData[]>([]);
    const [filteredData, setFilteredData] = useState<CommitDayData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<'7' | '30' | '365' | 'all'>('all');
    const chartRef = useRef<HTMLDivElement>(null);

    const fetchUserCommits = async () => {
        setLoading(true);
        try {
            const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);
            const repos = reposRes.data;

            const allDates: string[] = [];

            await Promise.all(
                repos.map(async (repo: any) => {
                    let page = 1;
                    const perPage = 100;
                    while (true) {
                        const commitsRes = await axios.get(
                            `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=${perPage}&page=${page}`
                        );
                        const commits = commitsRes.data;

                        if (!commits.length) break;

                        commits.forEach((commit: Commit) => {
                            if (commit?.commit?.author?.date) {
                                const date = commit.commit.author.date.split('T')[0];
                                allDates.push(date);
                            }
                        });

                        if (commits.length < perPage) break;
                        page++;
                    }
                })
            );

            const grouped: Record<string, number> = {};
            allDates.forEach((date) => {
                grouped[date] = (grouped[date] || 0) + 1;
            });

            const sortedDates = Object.keys(grouped).sort();
            const start = new Date(sortedDates[0]);
            const end = new Date(sortedDates[sortedDates.length - 1]);
            const days = differenceInDays(end, start);

            const fullData: CommitDayData[] = [];
            for (let i = 0; i <= days; i++) {
                const date = format(addDays(start, i), 'yyyy-MM-dd');
                fullData.push({ date, count: grouped[date] || 0 });
            }

            setCommitData(fullData);
        } catch (error) {
            console.error('Error fetching user commits:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilter = () => {
        if (filter === 'all') {
            setFilteredData(commitData);
        } else {
            const daysBack = filter === '7' ? 7 : filter === '30' ? 30 : 365;
            const fromDate = subDays(new Date(), daysBack);
            const filtered = commitData.filter((item) => new Date(item.date) >= fromDate);
            setFilteredData(filtered);
        }
    };

    const handleExport = () => {
        if (chartRef.current) {
            html2canvas(chartRef.current).then((canvas) => {
                const link = document.createElement('a');
                link.download = `${username}-all-commits.png`;
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    };

    useEffect(() => {
        if (username) fetchUserCommits();
    }, [username]);

    useEffect(() => {
        applyFilter();
    }, [filter, commitData]);

    const totalCommits = filteredData.reduce((acc, cur) => acc + cur.count, 0);

    return (
        <div className=" sm:px-4">
            <div className="flex justify-between items-center mb-4 mt-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Total Commits: {totalCommits}
                    </p>
                </div>
                <div className="flex gap-2 max-sm:hidden">
                    <Button variant={filter === '7' ? 'default' : 'outline'} onClick={() => setFilter('7')}>7 days</Button>
                    <Button variant={filter === '30' ? 'default' : 'outline'} onClick={() => setFilter('30')}>30 days</Button>
                    <Button variant={filter === '365' ? 'default' : 'outline'} onClick={() => setFilter('365')}>1 year</Button>
                    <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
                    <Button variant="outline" onClick={handleExport}>Export</Button>
                </div>
                <div>
                    {/* <div className="flex gap-2  max-sm:hidden">
                    <Button variant={filter === '7' ? 'default' : 'outline'} onClick={() => setFilter('7')}>7 days</Button>
                    <Button variant={filter === '30' ? 'default' : 'outline'} onClick={() => setFilter('30')}>30 days</Button>
                    <Button variant={filter === '365' ? 'default' : 'outline'} onClick={() => setFilter('365')}>1 year</Button>
                    <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
                    <Button variant="outline" onClick={handleExport}>Export</Button>
                </div> */}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600" />
                </div>
            ) : (
                <div className="sm:max-w-3xl sm:mx-auto  sm:p-4 border rounded-lg bg-background">
                    <div className="overflow-x-auto ">
                        <ResponsiveContainer
                            width={Math.max(600, filteredData.length * 10)}
                            height={180}
                        >
                            <LineChart data={filteredData}>
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#4f46e5"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            )}
        </div>
    );
};

export default UserAllCommitsGraph;
