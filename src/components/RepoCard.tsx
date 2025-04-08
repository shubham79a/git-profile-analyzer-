import { AppContext } from '@/context/AppContext';
import { LayoutDashboard } from 'lucide-react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const context = useContext(AppContext);
    if (!context) return null;
    const { user } = context as { user: { login: string } | null };

    return (
        <div>
            <div rel="noopener noreferrer"
                className="block p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-card cursor-pointer"
            >
                <div className='flex justify-between'>
                    <h3 onClick={() => window.open(`${repo?.html_url}`, "_blank")}
                        className="text-lg font-semibold text-primary mb-1 hover:underline hover:text-violet-400">{repo.name}
                    </h3>
                    <LayoutDashboard onClick={() => navigate(`/user/${user?.login}/repo/${repo?.name}`)} />
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {repo.description || "No description"}
                </p>
                <div className="flex items-center text-xs text-muted-foreground gap-4">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    {repo.language && <span>💻 {repo.language}</span>}
                </div>
            </div>
        </div>
    );
};

export default RepoCard;
