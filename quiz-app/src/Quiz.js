const Quiz = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const categories = quizData.map(item => item.category);
  const selectedQuestions = currentCategory !== null ? 
    quizData[currentCategory].questions : [];

  const handleCategorySelect = (index) => {
    setCurrentCategory(index);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  const handleAnswerOptionClick = (option) => {
    // Existing answer logic
  };

  return (
    <div className="quiz">
      {currentCategory === null ? (
        <CategorySelector 
          categories={categories} 
          onSelectCategory={handleCategorySelect} 
        />
      ) : showScore ? (
        <div className="score-section">
          You scored {score} out of {selectedQuestions.length}
          <button onClick={() => setCurrentCategory(null)}>
            Choose Another Category
          </button>
        </div>
      ) : (
        // Your existing question display logic
      )}
    </div>
  );
};
