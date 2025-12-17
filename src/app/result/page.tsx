'use client';

import React, { useEffect, useState } from 'react';

interface VoteResult {
  choice_id: string;
  count: number;
}

interface ResultsData {
  totalVotes: number;
  voteCounts: VoteResult[];
  votedStudents: number;
}

export default function ResultPage() {
  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/results');
      const data = await response.json();
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen min-w-full flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url('/assets/bg2.jpg')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
        }}
      >
        <div className="text-xl text-gray-800 font-bold">Loading results...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div
        className="min-h-screen min-w-full flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url('/assets/bg2.jpg')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
        }}
      >
        <div className="text-xl text-red-500 font-bold">Failed to load results</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen min-w-full py-8"
      style={{
        backgroundImage: `url('/assets/bg2.jpg')`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
          Hasil Voting Pemira HMIK
        </h1>

        {/* Statistik Umum */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Statistik</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600">Total Vote</p>
              <p className="text-3xl font-bold text-blue-600">{results.totalVotes}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600">Mahasiswa Sudah Vote</p>
              <p className="text-3xl font-bold text-green-600">{results.votedStudents}</p>
            </div>
          </div>
        </div>

        {/* Hasil Per Kandidat */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Perolehan Suara</h2>
          <div className="space-y-4">
            {results.voteCounts.map((result) => (
              <div key={result.choice_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {result.choice_id}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      Kandidat {result.choice_id}
                    </p>
                    <p className="text-gray-600">
                      {results.totalVotes > 0
                        ? ((result.count / results.totalVotes) * 100).toFixed(1)
                        : '0'}% dari total suara
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">{result.count}</p>
                  <p className="text-gray-600">suara</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Refresh */}
        <div className="text-center mt-8">
          <button
            onClick={fetchResults}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
          >
            Refresh Hasil
          </button>
        </div>
      </div>
    </div>
  );
}