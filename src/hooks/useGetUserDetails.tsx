import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import { useContext, useEffect } from 'react';

const useGetUserDetails = () => {
    const context = useContext(AppContext);
    if (!context) return;

    const { username, setUser } = context;

    useEffect(() => {
        if (!username) return;

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${username}`,
                    {
                        headers: {
                            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                        },
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
        };

        fetchUserDetails();
    }, [username]);
};

export default useGetUserDetails;
