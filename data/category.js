const CategorySelector = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-selector">
      <h2>Select a Category</h2>
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onSelectCategory(index)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
