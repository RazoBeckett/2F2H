import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import { PlusCircle } from "lucide-react"; // Import icon from Lucide
import { Tooltip } from "react-tooltip";

const quizzes = [
  { id: 1, title: "Math Quiz", date: "March 5, 2025", questions: 10 },
  { id: 2, title: "Science Quiz", date: "March 7, 2025", questions: 15 },
  { id: 3, title: "History Quiz", date: "March 10, 2025", questions: 8 },
];

const Quizzes = () => {
  const handleCreateQuiz = () => {
    window.open("https://docs.google.com/forms/", "_blank"); // Opens Google Forms in a new tab
  };

  return (
    <div className="max-w-6xl mt-24 mx-auto p-8 ml-80">
      {/* Header Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quizzes</h2>
            <p className="text-gray-600 mt-1">
              Create and manage your classroom quizzes
            </p>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                Total Quizzes: {quizzes.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleCreateQuiz}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow group"
            data-tooltip-id="create-quiz-tooltip"
            data-tooltip-content="Create a new quiz"
          >
            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            <span className="font-medium">Create Quiz</span>
          </button>
          <Tooltip id="create-quiz-tooltip" />
        </div>
      </div>

      {/* Quizzes Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quiz ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quizzes.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      #{quiz.id.toString().padStart(3, "0")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{quiz.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{quiz.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{quiz.questions} Questions</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-800">
                      Active
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

Quizzes.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      questions: PropTypes.number.isRequired,
    })
  ),
};

export default Quizzes;
