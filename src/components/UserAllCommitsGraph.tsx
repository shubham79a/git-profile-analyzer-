// components/UserAllCommitsGraph.tsx
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import useGetUserAllCommits from '@/hooks/useGetUserAllCommits';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar } from './ui/avatar';
import { Filter, FilterIcon, MenuIcon } from 'lucide-react';


const UserAllCommitsGraph: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [filter, setFilter] = useState<'7' | '30' | '365' | 'all'>('all');
    const chartRef = useRef<HTMLDivElement>(null);

    const { filteredCommits, total, loading } = useGetUserAllCommits(username || '', filter);

    const handleExport = () => {
        if (chartRef.current) {
            html2canvas(chartRef.current).then(canvas => {
                const link = document.createElement('a');
                link.download = `${username}-all-commits.png`;
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    };

    return (
        <div className="sm:px-4">
            <div className="flex justify-between items-center mb-4 mt-4">
                <p className="text-sm text-muted-foreground">Total Commits: {total}</p>
                <div className="flex gap-2 max-sm:hidden">
                    {['7', '30', '365', 'all'].map(d => (
                        <Button key={d} variant={filter === d ? 'default' : 'outline'} onClick={() => setFilter(d as any)}>
                            {d === '365' ? '1 year' : `${d} days`}
                        </Button>
                    ))}
                    {/* <Button variant="outline" onClick={handleExport}>Export</Button> */}
                </div>
                <div className='sm:hidden'>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                {
                                    <FilterIcon className='mt-1' />
                                }
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-40">
                            <div>
                                <div className="flex flex-col gap-2">
                                    {['7', '30', '365', 'all'].map(d => (
                                        <Button key={d} variant={filter === d ? 'default' : 'outline'} onClick={() => setFilter(d as any)}>
                                            {d === '365' ? '1 year' : `${d} days`}
                                        </Button>
                                    ))}
                                    {/* <Button variant="outline" onClick={handleExport}>Export</Button> */}
                                </div>

                            </div>
                        </PopoverContent>
                    </Popover>

                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin h-8 w-8 border-t-2 border-indigo-600 rounded-full" />
                </div>
            ) : (
                <div ref={chartRef} className="sm:max-w-3xl sm:mx-auto sm:p-4 border rounded-lg bg-background">
                    <div className="overflow-x-auto">
                        <ResponsiveContainer width={Math.max(600, filteredCommits.length * 10)} height={180}>
                            <LineChart data={filteredCommits}>
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAllCommitsGraph;
