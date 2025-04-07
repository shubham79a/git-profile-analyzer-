import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AppContextType {
    username: string;
    setUsername: (username: string) => void;
    user: object[];
    setUser: React.Dispatch<React.SetStateAction<object[]>>;
    repos: Repo[];
    setRepos: React.Dispatch<React.SetStateAction<Repo[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

const AppContextProvider: React.FC<Props> = ({ children }) => {

    const [username, setUsername] = useState<string>("");

    const [user, setUser] = useState<object[]>([])
    const [repos, setRepos] = useState<Repo[]>([]);

    const value: AppContextType = {
        username,
        setUsername,
        user,
        setUser,
        repos,
        setRepos


    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
