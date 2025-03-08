import React, { useState } from "react";
import { MessageSquare, PlusCircle, Send } from "lucide-react";

const DoubtForum = () => {
  const [doubts, setDoubts] = useState([
    { id: 1, title: "How does recursion work in JavaScript?", student: "Amit Kumar", replies: [] },
    { id: 2, title: "Best resources to learn Data Structures?", student: "Priya Sharma", replies: [] },
  ]);

  const [replyText, setReplyText] = useState({});

  const handleReplyChange = (id, text) => {
    setReplyText((prev) => ({ ...prev, [id]: text }));
  };

  const handleReplySubmit = (id) => {
    if (!replyText[id]) return;

    setDoubts((prevDoubts) =>
      prevDoubts.map((doubt) =>
        doubt.id === id ? { ...doubt, replies: [...doubt.replies, replyText[id]] } : doubt
      )
    );
    
    setReplyText((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="max-w-4xl mt-22 mx-auto p-8 ms-[450px]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <MessageSquare size={24} className="text-gray-700" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800">
            Doubt Forum
          </h2>
        </div>
      </div>

      {/* Doubts List */}
      <div className="space-y-6">
        {doubts.length > 0 ? (
          doubts.map((doubt) => (
            <div
              key={doubt.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {doubt.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                      {doubt.student.charAt(0)}
                    </span>
                    <span className="text-gray-600">{doubt.student}</span>
                  </div>
                </div>
              </div>
              
              {/* Replies Section */}
              <div className="mt-6 space-y-3">
                {doubt.replies.length > 0 ? (
                  doubt.replies.map((reply, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p className="text-gray-700 flex items-center gap-2">
                        <span className="text-gray-400">•</span> 
                        {reply}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 py-3">No replies yet. Be the first to respond!</p>
                )}
              </div>

              {/* Reply Input */}
              <div className="mt-5">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={replyText[doubt.id] || ""}
                    onChange={(e) => handleReplyChange(doubt.id, e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full px-4 py-3 bg-white rounded-lg pr-[100px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
                  />
                  <button
                    onClick={() => handleReplySubmit(doubt.id)}
                    className="absolute right-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all duration-200 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-md border border-gray-200">
            <MessageSquare size={40} className="text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No doubts available yet. Start a discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtForum;
