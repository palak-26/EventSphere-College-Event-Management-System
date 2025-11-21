import React from "react";
import LayoutWithSidebar from "../components/LayoutWithSidebar";

export default function Leaderboard() {
  const leaderboard = [
    { rank: 1, clubName: "Tech Innovators Club", score: 982, eventsConducted: 12, members: 143, badge: "🏆" },
    { rank: 2, clubName: "Cultural Arts Society", score: 915, eventsConducted: 10, members: 98, badge: "🥈" },
    { rank: 3, clubName: "Photography Club", score: 884, eventsConducted: 8, members: 63, badge: "🥉" },
    { rank: 4, clubName: "Robotics Club", score: 842, eventsConducted: 11, members: 78 },
    { rank: 5, clubName: "Literature & Debating Club", score: 799, eventsConducted: 7, members: 56 },
  ];

  return (
    <LayoutWithSidebar>
      <div className="p-4 sm:p-6 lg:p-10 text-white">

        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-6">
          Club Leaderboard
        </h1>

        <p className="subtle text-sm sm:text-lg mb-6 sm:mb-8">
          Ranking of clubs based on activity, event engagement, and participation.
        </p>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="text-white/70 border-b border-white/10">
                <th className="p-4">Rank</th>
                <th className="p-4">Club Name</th>
                <th className="p-4">Score</th>
                <th className="p-4">Events Conducted</th>
                <th className="p-4">Members</th>
              </tr>
            </thead>

            <tbody>
              {leaderboard.map((club, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 text-xl font-bold text-yellow-300">
                    {club.badge ? club.badge : club.rank}
                  </td>

                  <td className="p-4 text-white font-semibold">{club.clubName}</td>

                  <td className="p-4 text-blue-300 font-semibold">{club.score}</td>

                  <td className="p-4 text-white/80">{club.eventsConducted}</td>

                  <td className="p-4 text-white/60">{club.members}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 mt-4">
          {leaderboard.map((club, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/10"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-3xl">{club.badge || club.rank}</span>
                <span className="text-blue-300 font-bold text-lg">{club.score}</span>
              </div>

              <div className="font-semibold text-white text-base">{club.clubName}</div>

              <div className="text-gray-300 text-sm mt-2">
                <div>Events: <span className="font-semibold text-white">{club.eventsConducted}</span></div>
                <div>Members: <span className="font-semibold text-white">{club.members}</span></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </LayoutWithSidebar>
  );
}
