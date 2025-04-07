import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "@/context/AppContext";

const useGetAllRepos = () => {
  const { username } = useParams();
  const context = useContext(AppContext);

  if (!context) return;

  const { setRepos } = context;

  useEffect(() => {
    const fetchRepos = async () => {
      if (!username) return;

      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchRepos();
  }, [username]);
};

export default useGetAllRepos;
