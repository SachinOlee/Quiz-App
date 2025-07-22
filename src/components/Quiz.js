import React, { useState } from "react";
import questions from "../data/questions";

export default function Quiz() {
  const [currentQn, setCurrentQn] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selected) => {
    const correct = questions[currentQn].answer;
    if (selected === correct) setScore(score + 1);

    const nextQn = currentQn + 1;
    if (nextQn < questions.length) {
      setCurrentQn(nextQn);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQn(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[350px]">
        {!showResult ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Q{currentQn + 1}. {questions[currentQn].question}
            </h2>
            <div className="space-y-2">
              {questions[currentQn].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              {currentQn + 1} of {questions.length}
            </p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Your Score: {score}</h2>
            <p className="mb-4">
              You got {score} out of {questions.length}
            </p>
            <button
              onClick={restart}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
