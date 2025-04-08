import React, { createContext, useState, useEffect, ReactNode } from "react";
import { CommitDayData } from "@/hooks/useGetUserAllCommits";

// --- Exported Repo type used across the app
export interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  updated_at: string;
}

// --- Exported Context Type for usage in components
export interface AppContextType {
  username: string;
  setUsername: (username: string) => void;
  user: object | null;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
  repos: Repo[];
  setRepos: React.Dispatch<React.SetStateAction<Repo[]>>;
  userCommits: CommitDayData[] | null;
  setUserCommits: React.Dispatch<React.SetStateAction<CommitDayData[] | null>>;
  clearUser: () => void;
}

// --- Create the Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Provider Component
interface Props {
  children: ReactNode;
}

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [username, setUsername] = useState<string>(
    () => localStorage.getItem("devtrace_username") || ""
  );

  const [user, setUser] = useState<object | null>(() => {
    const stored = localStorage.getItem("devtrace_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [repos, setRepos] = useState<Repo[]>(() => {
    const stored = localStorage.getItem("devtrace_repos");
    return stored ? JSON.parse(stored) : [];
  });

  const [userCommits, setUserCommits] = useState<CommitDayData[] | null>(() => {
    const stored = localStorage.getItem("devtrace_commits");
    return stored ? JSON.parse(stored) : null;
  });

  // --- Sync with LocalStorage
  useEffect(() => {
    if (username) {
      localStorage.setItem("devtrace_username", username);
    } else {
      localStorage.removeItem("devtrace_username");
    }
  }, [username]);

  useEffect(() => {
    user
      ? localStorage.setItem("devtrace_user", JSON.stringify(user))
      : localStorage.removeItem("devtrace_user");
  }, [user]);

  useEffect(() => {
    repos.length
      ? localStorage.setItem("devtrace_repos", JSON.stringify(repos))
      : localStorage.removeItem("devtrace_repos");
  }, [repos]);

  useEffect(() => {
    userCommits
      ? localStorage.setItem("devtrace_commits", JSON.stringify(userCommits))
      : localStorage.removeItem("devtrace_commits");
  }, [userCommits]);

  const clearUser = () => {
    setUsername("");
    setUser(null);
    setRepos([]);
    setUserCommits(null);
    localStorage.removeItem("devtrace_username");
    localStorage.removeItem("devtrace_user");
    localStorage.removeItem("devtrace_repos");
    localStorage.removeItem("devtrace_commits");
  };

  const value: AppContextType = {
    username,
    setUsername,
    user,
    setUser,
    repos,
    setRepos,
    userCommits,
    setUserCommits,
    clearUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
