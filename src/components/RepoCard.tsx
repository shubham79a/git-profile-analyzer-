import React from 'react';

interface RepoCardProps {
    repo: {
        name: string;
        description: string;
        html_url: string;
        stargazers_count: number;
        language: string;
        forks_count: number;
    };
}

const RepoCard: React.FC<{ repo: RepoCardProps["repo"] }> = ({ repo }) => {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-card"
        >
            <h3 className="text-lg font-semibold text-primary mb-1">{repo.name}</h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {repo.description || "No description"}
            </p>
            <div className="flex items-center text-xs text-muted-foreground gap-4">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                {repo.language && <span>💻 {repo.language}</span>}
            </div>
        </a>
    );
};

export default RepoCard;
