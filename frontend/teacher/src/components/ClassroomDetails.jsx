import { useParams } from "react-router-dom";
import { useState } from "react";

const ClassroomDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1", dueDate: "March 15, 2025" },
    { id: 2, title: "Assignment 2", dueDate: "March 22, 2025" },
  ]);
  const [students, setStudents] = useState([
    "Alice Johnson",
    "Bob Smith",
    "Charlie Davis",
    "Diana King",
  ]);
  const [discussion, setDiscussion] = useState([]);
  const [message, setMessage] = useState("");
  const [showStudentList, setShowStudentList] = useState(false);
  const [viewAssignments, setViewAssignments] = useState(false);

  // Assign Task Functionality
  const handleAssignTask = () => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
      setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);
    }
  };

  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newNote = {
        id: notes.length + 1,
        name: file.name,
        url: URL.createObjectURL(file),
      };
      setNotes([...notes, newNote]);
    }
  };

  // Handle Discussion Forum Messages
  const handlePostMessage = () => {
    if (message.trim()) {
      setDiscussion([...discussion, { id: discussion.length + 1, text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 mt-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Classroom {id}</h1>
                <p className="text-gray-600 mt-1">Manage your virtual classroom resources and activities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <button
            onClick={handleAssignTask}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group"
          >
            <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="font-medium text-gray-700">Assign Task</span>
          </button>

          <label
            htmlFor="noteUpload"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer group"
          >
            <svg className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium text-gray-700">Add Note</span>
          </label>
          <input type="file" id="noteUpload" onChange={handleFileUpload} className="hidden" />

          <button
            onClick={() => setViewAssignments(true)}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group"
          >
            <svg className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-medium text-gray-700">Assignments</span>
          </button>

          <button
            onClick={() => setShowStudentList(true)}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group"
          >
            <svg className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium text-gray-700">Students</span>
          </button>

          <button
            onClick={() => document.getElementById('discussion-section').scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group"
          >
            <svg className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <span className="font-medium text-gray-700">Discussion</span>
          </button>
        </div>

        {/* Tasks Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Assigned Tasks</h2>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {tasks.length} Tasks
              </span>
            </div>
            
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-500">No tasks assigned yet</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <span className="font-medium text-gray-700">{task.name}</span>
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Classroom Notes</h2>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                {notes.length} Notes
              </span>
            </div>

            {notes.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">No notes added yet</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {notes.map((note) => (
                  <li key={note.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors duration-200">
                    <span className="font-medium text-gray-700">{note.name}</span>
                    <a
                      href={note.url}
                      download={note.name}
                      className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Discussion Forum */}
        <div id="discussion-section" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Discussion Forum</h2>
          
          <div className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={handlePostMessage}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send
              </button>
            </div>
          </div>

          {discussion.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <p className="text-gray-500">No messages yet. Start the discussion!</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {discussion.map((msg) => (
                <li key={msg.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">U</span>
                    </div>
                    <div>
                      <p className="text-gray-900">{msg.text}</p>
                      <span className="text-sm text-gray-500">Just now</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Student List Modal */}
        {showStudentList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Student List</h2>
                <button
                  onClick={() => setShowStudentList(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <ul className="divide-y divide-gray-100">
                {students.map((student, index) => (
                  <li key={index} className="py-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">{student.charAt(0)}</span>
                    </div>
                    <span className="text-gray-700">{student}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Assignments Section */}
        {viewAssignments && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Assignments</h2>
                <button
                  onClick={() => setViewAssignments(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <ul className="space-y-3">
                {assignments.map((a) => (
                  <li key={a.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{a.title}</h3>
                        <p className="text-sm text-gray-500">Due: {a.dueDate}</p>
                      </div>
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassroomDetails;
