import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: loading state
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // ✅ Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/questions');
        const data = await response.json();
        setQuizData(data);  // Set data into state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

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

  if (loading) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="quiz">
      {currentCategory === null ? (
        <div>
          <h2>Select a Category</h2>
          {categories.map((category, index) => (
            <button key={index} onClick={() => handleCategorySelect(index)}>
              {category}
            </button>
          ))}
        </div>
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
