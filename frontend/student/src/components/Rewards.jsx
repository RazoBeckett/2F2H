import React, { useState } from "react";

// Problem Set
const problems = [
  {
    id: 1,
    question: "Write a function to find the factorial of a given number.",
    testInput: 5,
    expectedOutput: 120, // Factorial of 5 = 120
    functionName: "factorial",
  },
  {
    id: 2,
    question: "Write a function to check if a given number is prime.",
    testInput: 7,
    expectedOutput: true, // 7 is a prime number
    functionName: "isPrime",
  },
];

const Rewards = () => {
  const [challengesSolved, setChallengesSolved] = useState(0);
  const [userCode, setUserCode] = useState({ factorial: "", isPrime: "" });
  const [messages, setMessages] = useState({ factorial: "", isPrime: "" });

  // Reward tiers
  const getReward = (solved) => {
    if (solved >= 30) return "🏆 Gold Badge";
    if (solved >= 20) return "🥈 Silver Badge";
    if (solved >= 10) return "🥉 Bronze Badge";
    return "No rewards yet";
  };

  // Function to evaluate user code
  const checkAnswer = (problem) => {
    try {
      const { functionName, testInput, expectedOutput } = problem;

      // Dynamically execute user's function
      const userFunction = new Function(
        "n",
        userCode[functionName] + `; return ${functionName}(n);`
      );

      // Get the output
      const output = userFunction(testInput);

      if (output === expectedOutput) {
        setChallengesSolved((prev) => prev + 1);
        setMessages((prev) => ({ ...prev, [functionName]: "✅ Correct!" }));
      } else {
        setMessages((prev) => ({
          ...prev,
          [functionName]: `❌ Incorrect. Expected ${expectedOutput}, got ${output}`,
        }));
      }
    } catch (error) {
      setMessages((prev) => ({
        ...prev,
        [problem.functionName]: `⚠️ Error: ${error.message}`,
      }));
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center">Solve the Problems</h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {problems.map((problem) => (
          <div key={problem.id} className="p-5 border rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">{problem.question}</h3>

            <textarea
              className="mt-2 p-2 border rounded-lg w-full"
              rows="5"
              placeholder={`Write your ${problem.functionName} function here...`}
              value={userCode[problem.functionName]}
              onChange={(e) =>
                setUserCode((prev) => ({
                  ...prev,
                  [problem.functionName]: e.target.value,
                }))
              }
            ></textarea>

            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => checkAnswer(problem)}
            >
              Run Code
            </button>

            {messages[problem.functionName] && (
              <p className="mt-2">{messages[problem.functionName]}</p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-lg">Challenges Solved: {challengesSolved}</p>

      <div className="mt-4 p-3 border rounded-lg bg-gray-100 text-center">
        <h3 className="font-semibold">Your Reward:</h3>
        <p className="text-lg">{getReward(challengesSolved)}</p>
      </div>
    </div>
  );
};

export default Rewards;
