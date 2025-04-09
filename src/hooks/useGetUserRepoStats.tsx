// src/hooks/useGetRepoDetails.ts
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface RepoDetails {
  updated_at: string;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const useGetUserRepoStats = () => {
  const { username, reponame } = useParams();
  const [repoDetails, setRepoDetails] = useState<RepoDetails | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepoAndCommits = async () => {
      if (!username || !reponame) return;

      try {
        setLoading(true);

        // Fetch repo details
        const repoRes = await fetch(`https://api.github.com/repos/${username}/${reponame}`);
        if (!repoRes.ok) throw new Error("Repo not found");
        const repoData = await repoRes.json();
        setRepoDetails(repoData);

        // Fetch commits
        const commitRes = await fetch(`https://api.github.com/repos/${username}/${reponame}/commits`);
        if (!commitRes.ok) throw new Error("Failed to fetch commits");
        const commitData = await commitRes.json();
        setCommits(commitData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRepoAndCommits();
  }, [username, reponame]);

  return { repoDetails, commits, loading, error };
};

export default useGetUserRepoStats;
