import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useParams } from 'react-router-dom';
import { format, addDays, differenceInDays, subDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';

interface Commit {
  commit: {
    author: {
      date: string;
    };
  };
}

interface CommitDayData {
  date: string;
  count: number;
}

const RepoCommitsChart: React.FC = () => {
  const { username, repo } = useParams<{ username: string; repo: string }>();
  const [commitData, setCommitData] = useState<CommitDayData[]>([]);
  const [filteredData, setFilteredData] = useState<CommitDayData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'7' | '30' | 'all'>('all');
  const chartRef = useRef<HTMLDivElement>(null);

  const fetchCommits = async () => {
    let page = 1;
    const perPage = 100;
    let allCommits: Commit[] = [];

    try {
      while (true) {
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${repo}/commits?per_page=${perPage}&page=${page}`
        );
        if (response.data.length === 0) break;
        allCommits = [...allCommits, ...response.data];
        page++;
      }

      const grouped: Record<string, number> = {};

      allCommits.forEach((commit) => {
        const date = commit.commit.author.date.split('T')[0];
        grouped[date] = (grouped[date] || 0) + 1;
      });

      const allDates = Object.keys(grouped).sort();
      const start = new Date(allDates[0]);
      const end = new Date(allDates[allDates.length - 1]);

      const days = differenceInDays(end, start);
      const fullData: CommitDayData[] = [];

      for (let i = 0; i <= days; i++) {
        const date = format(addDays(start, i), 'yyyy-MM-dd');
        fullData.push({
          date,
          count: grouped[date] || 0,
        });
      }

      setCommitData(fullData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching commits:', error);
    }
  };

  const applyFilter = () => {
    if (filter === 'all') {
      setFilteredData(commitData);
      return;
    }

    const daysBack = filter === '7' ? 7 : 30;
    const fromDate = subDays(new Date(), daysBack);
    const filtered = commitData.filter(
      (item) => new Date(item.date) >= fromDate
    );
    setFilteredData(filtered);
  };

  const handleExport = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = `${repo}-commits.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  useEffect(() => {
    if (username && repo) fetchCommits();
  }, [username, repo]);

  useEffect(() => {
    applyFilter();
  }, [filter, commitData]);

  const totalCommits = filteredData.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            Commit Activity for <span className="text-indigo-600">{repo}</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Total Commits: {totalCommits}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant={filter === '7' ? 'default' : 'outline'} onClick={() => setFilter('7')}>
            Last 7 days
          </Button>
          <Button variant={filter === '30' ? 'default' : 'outline'} onClick={() => setFilter('30')}>
            Last 30 days
          </Button>
          <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
            All Time
          </Button>
          <Button variant="outline" onClick={handleExport}>Export</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600" />
        </div>
      ) : (
        <div className="overflow-x-auto" ref={chartRef}>
          <ResponsiveContainer width={Math.max(800, filteredData.length * 10)} height={400}>
            <LineChart data={filteredData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default RepoCommitsChart;
