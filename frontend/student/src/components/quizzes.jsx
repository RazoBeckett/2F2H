import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Given quiz data
const quizData = [
  {
    type: "mcq",
    question: "Who coined the term Machine Learning?",
    options: ["Arthur Samuel", "Alan Turing", "John McCarthy", "Andrew Ng"],
    correct_answer: "Arthur Samuel",
    source_text: "The name machine learning was coined in 1959 by Arthur Samuel.",
  },
  {
    type: "true_false",
    question: "True or False: Machine learning was first introduced in 1965.",
    options: ["True", "False"],
    correct_answer: "False",
    source_text: "The name machine learning was coined in 1959 by Arthur Samuel.",
  },
  {
    type: "mcq",
    question: "Which language is widely used for Machine Learning?",
    options: ["Python", "Java", "C++", "Ruby"],
    correct_answer: "Python",
    source_text: "Python is the most widely used language for machine learning.",
  },
  {
    type: "mcq",
    question: "What is the main goal of supervised learning?",
    options: [
      "Discover patterns in data",
      "Minimize error using labeled data",
      "Work without human intervention",
      "None of the above",
    ],
    correct_answer: "Minimize error using labeled data",
    source_text: "Supervised learning aims to minimize errors by using labeled datasets.",
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  // Handle answer selection
  const handleSelectAnswer = (questionIndex, selectedOption) => {
    setAnswers({ ...answers, [questionIndex]: selectedOption });
  };

  // Check if answers are correct and calculate score
  const checkAnswers = () => {
    let correct = 0,
      incorrect = 0;

    quizData.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    setScore({ correct, incorrect });
    setShowResults(true);
  };

  // Chart Data
  const chartData = [
    { name: "Correct Answers", value: score.correct },
    { name: "Incorrect Answers", value: score.incorrect },
  ];

  // Colors for the chart
  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Machine Learning Quiz</h2>

      {/* Hide questions when results are shown */}
      {!showResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizData.map((question, index) => (
            <div key={index} className="p-5 border border-black rounded-lg shadow-lg bg-white">
              <h3 className="text-lg font-semibold mb-3">{question.question}</h3>

              {/* Display MCQ options */}
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    className={`block w-full text-left p-2 border border-black rounded-md transition ${
                      answers[index] === option
                        ? "bg-blue-500 text-white border-blue-600" // Highlight selected option
                        : "bg-gray-100 text-black hover:bg-gray-200"
                    }`}
                    onClick={() => handleSelectAnswer(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {!showResults && (
        <div className="text-center mt-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md border border-black shadow-md hover:bg-blue-700 transition"
            onClick={checkAnswers}
          >
            Submit Answers
          </button>
        </div>
      )}

      {/* Performance Chart */}
      {showResults && (
        <div className="mt-10 text-center">
          <h3 className="text-2xl font-semibold mb-5">Your Performance</h3>

          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <p className="text-lg mt-3">
            ✅ <strong>Correct:</strong> {score.correct} | ❌ <strong>Incorrect:</strong>{" "}
            {score.incorrect}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
