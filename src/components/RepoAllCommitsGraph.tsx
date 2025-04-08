// components/RepoCommitsGraph.tsx
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

type Commit = {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        };
    };
};

interface Props {
    commits: Commit[];
}

const RepoAllCommitsGraph: React.FC<Props> = ({ commits }) => {
    // Group commits by day
    const commitDataByDay = commits.reduce<Record<string, number>>((acc, commit) => {
        const date = new Date(commit.commit.author.date).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    // Prepare graph data
    const graphData = Object.entries(commitDataByDay).map(([date, count]) => ({
        date,
        count,
    }));

    return (
        <div className=" ">
            <h2 className="text-lg font-semibold mb-2 mt-6">Commit Activity</h2>
            <ResponsiveContainer className="max-sm:w-full" height={180}>
                <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RepoAllCommitsGraph;
