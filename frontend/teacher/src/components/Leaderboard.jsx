import React from "react";
import { Trophy, Medal } from "lucide-react";

const leaderboardData = [
  { id: 1, name: "Rahul Sharma", score: 98, change: "+2" },
  { id: 2, name: "Sneha Gupta", score: 92, change: "-1" },
  { id: 3, name: "Amit Verma", score: 88, change: "+3" },
  { id: 4, name: "Priya Singh", score: 85, change: "0" },
  { id: 5, name: "Rohan Mehta", score: 82, change: "+1" },
];

const trophyColors = {
  0: "text-yellow-500", // Gold
  1: "text-gray-400",   // Silver
  2: "text-orange-500"  // Bronze
};

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 mt-24 ms-[450px]">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Student Leaderboard</h2>
            <p className="text-gray-600 mt-1">Top performing students based on quiz scores</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaderboardData.slice(0, 3).map((student, index) => (
          <div 
            key={student.id}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 relative overflow-hidden ${
              index === 0 ? 'ring-2 ring-yellow-500/20' : ''
            }`}
          >
            <div className="absolute top-0 right-0 w-24 h-24">
              <div className={`absolute transform rotate-45 translate-x-8 -translate-y-8 w-24 h-6 ${
                index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
              }`}></div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                index === 0 ? 'bg-yellow-50' : index === 1 ? 'bg-gray-50' : 'bg-orange-50'
              }`}>
                <Trophy className={`w-5 h-5 ${trophyColors[index]}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">#{index + 1} Place</p>
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-gray-900">{student.score}</span>
                  <span className="text-sm text-gray-500">points</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaderboardData.map((student, index) => (
                <tr 
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {index < 3 ? (
                        <Trophy className={`w-5 h-5 ${trophyColors[index]}`} />
                      ) : (
                        <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-gray-600">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-semibold text-gray-900">{student.score}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      student.change.startsWith('+') ? 'bg-green-50 text-green-700' :
                      student.change.startsWith('-') ? 'bg-red-50 text-red-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {student.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;