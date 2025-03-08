import React from "react";
import { Trophy, BookOpenText, Calendar } from "lucide-react"; // Importing only necessary icons

const announcements = [
  { id: 1, message: "Upcoming exam", date: "March 10, 2025", icon: <BookOpenText size={20} /> },
  { id: 2, message: "Assignment submission", date: "March 12, 2025", icon: <Trophy size={20} /> },
  { id: 3, message: "Guest lecture on AI by Dr. A. Sharma", date: "March 14, 2025", icon: <Calendar size={20} /> },
];

const Announcements = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-[80px] max-w-lg mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        Announcements
      </h2>
      <ul className="space-y-3">
        {announcements.map((announcement) => (
          <li key={announcement.id} className="border-b pb-3 flex items-start gap-3 flex-wrap">
            {announcement.icon && <span className="text-black">{announcement.icon}</span>}
            <div className="flex-1 min-w-0">
              <p className="text-gray-700 break-words text-sm sm:text-base">{announcement.message}</p>
              <span className="text-sm text-red-500 block sm:inline">{announcement.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;