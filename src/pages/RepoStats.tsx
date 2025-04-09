import React, { useContext } from 'react';
import RepoAllCommitsGraph from '@/components/RepoAllCommitsGraph';
import RepoCommitHistory from '@/components/RepoCommitHistory';
import RepoDetails from '@/components/RepoDetails';
import { AppContext } from '@/context/AppContext';
import useGetUserRepoDetails from '@/hooks/useGetUserRepoStats';

export interface RepoInfo {
  updated_at?: string;
  [key: string]: any;
}

const RepoStats: React.FC = () => {
  const { repoDetails: fetchedRepoDetails, loading, error, commits } = useGetUserRepoDetails();
  const context = useContext(AppContext);
  if (!context) return null;

  const repoDetails: RepoInfo | null = fetchedRepoDetails
    ? { ...fetchedRepoDetails, updated_at: fetchedRepoDetails.updated_at || new Date().toISOString() }
    : null;

  return (
    <div className="sm:px-[5%] max-sm:px-3 lg:px-[5%] min-h-[80vh]">
      {/* Status Message */}
      <div className="py-2">
        {loading && (
          <div className="text-sm text-blue-500 bg-blue-100 rounded-md px-4 py-2 w-fit">
            Fetching repository data...
          </div>
        )}
        {error && (
          <div className="text-sm text-red-500 bg-red-100 rounded-md px-4 py-2 w-fit">
            Failed to load repository details.
          </div>
        )}
       
      </div>

      {/* Layout */}
      <div className="lg:grid grid-cols-4 lg:gap-6">
        {/* Sidebar */}
        <div className="max-lg:hidden lg:col-span-1">
          {repoDetails && <RepoDetails repoDetails={repoDetails} />}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 flex flex-col gap-6 max-lg:w-full">
          <RepoAllCommitsGraph commits={commits} />
          <RepoCommitHistory commits={commits} />
        </div>
      </div>
    </div>
  );
};

export default RepoStats;
