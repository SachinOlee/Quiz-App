import React, { useState } from 'react';

// Dummy data and component (replace with actual ones or separate imports)
const quizData = [
  {
    category: 'Math',
    questions: [
      { question: '2 + 2 = ?', options: ['3', '4', '5'], answer: '4' },
      { question: '5 - 3 = ?', options: ['1', '2', '3'], answer: '2' },
    ],
  },
  {
    category: 'Science',
    questions: [
      { question: 'Boiling point of water?', options: ['90°C', '100°C'], answer: '100°C' },
    ],
  },
];

const CategorySelector = ({ categories, onSelectCategory }) => (
  <div>
    <h2>Select a Category</h2>
    {categories.map((category, index) => (
      <button key={index} onClick={() => onSelectCategory(index)}>
        {category}
      </button>
    ))}
  </div>
);

const Quiz = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const categories = quizData.map(item => item.category);
  const selectedQuestions = currentCategory !== null ? quizData[currentCategory].questions : [];

  const handleCategorySelect = (index) => {
    setCurrentCategory(index);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  const handleAnswerOptionClick = (option) => {
    if (option === selectedQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < selectedQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz">
      {currentCategory === null ? (
        <CategorySelector categories={categories} onSelectCategory={handleCategorySelect} />
      ) : showScore ? (
        <div className="score-section">
          <p>You scored {score} out of {selectedQuestions.length}</p>
          <button onClick={resetQuiz}>Restart This Quiz</button>
          <button onClick={() => setCurrentCategory(null)}>Choose Another Category</button>
        </div>
      ) : (
        <div className="question-section">
          <h3>{selectedQuestions[currentQuestionIndex].question}</h3>
          {selectedQuestions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerOptionClick(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
