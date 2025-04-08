// components/CommitHistory.tsx
import React from "react";
import { CalendarDays, GitCommitHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Commit = {
    sha: string;
    html_url: string;
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

const RepoCommitHistory: React.FC<Props> = ({ commits }) => {
    const sortedCommits = [...commits].sort((a, b) =>
        new Date(b.commit.author.date).getTime() -
        new Date(a.commit.author.date).getTime()
    );

    return (
        <div className="w-full space-y-4 mx-2 ">
            <h2 className="text-xl font-semibold mb-5 mt-2">Commit History</h2>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {sortedCommits.map((commit) => (
                    <a
                        href={commit.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={commit.sha}
                        className="block border rounded-xl p-4 hover:bg-accent/30 transition duration-200 shadow-sm"
                    >
                        <div className="flex items-start gap-3">
                            <GitCommitHorizontal className="text-primary mt-1" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground mb-1">
                                    {commit.commit.message}
                                </p>
                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="w-4 h-4" />
                                        {formatDistanceToNow(new Date(commit.commit.author.date), {
                                            addSuffix: true,
                                        })}
                                    </div>
                                    <div className="italic">by {commit.commit.author.name}</div>
                                    <code className="text-[11px] bg-muted px-1.5 py-0.5 rounded">
                                        {commit.sha.slice(0, 7)}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default RepoCommitHistory;
