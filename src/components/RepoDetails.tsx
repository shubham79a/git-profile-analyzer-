import React from "react";
import { Star, GitFork, Globe, CalendarClock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Repo = {
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
};

interface Props {
    repoDetails: Repo;
}

const RepoDetails: React.FC<Props> = ({ repoDetails }) => {
    return (
        <div className="mt-16 rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col items-start mb-5 gap-3">
                <a
                    href={repoDetails?.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:underline"
                >
                    {repoDetails?.name}
                </a>
                <div className="text-sm bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                    {repoDetails?.language || "N/A"}
                </div>
            </div>

            {repoDetails?.description && (
                <p className="text-sm text-muted-foreground mb-4">
                    {repoDetails.description}
                </p>
            )}

            <div className="flex gap-4 text-xs text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {repoDetails?.stargazers_count}
                </div>
                <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {repoDetails?.forks_count}
                </div>
                <div className="flex items-center gap-1">
                    <CalendarClock className="w-4 h-4" />
                    Updated{" "}
                    {repoDetails?.updated_at
                        ? formatDistanceToNow(new Date(repoDetails.updated_at), {
                            addSuffix: true,
                        })
                        : "Unknown"}
                </div>
                <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a
                        href={repoDetails?.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        View Repo
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RepoDetails;
