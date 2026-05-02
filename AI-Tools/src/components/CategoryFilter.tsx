interface CategoryFilterProps {
  category: string;
  onCategory: (value: string) => void;
}

const categories = ["All", "Chat", "Image", "Code", "Audio", "Video", "Productivity"];
// here we colect buttons for each category,
//  and "All" is included to allow users to reset the category filter and see all tools regardless of their category.
export default function CategoryFilter({ category, onCategory }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          // when we use map we need to provide a unique key for each element in the list,
          // key means that each button will have a unique identifier based on the category name, 
          // which helps React efficiently update the UI when the list changes.
          className={category === cat ? "cat-btn active" : "cat-btn"}
          
          onClick={() => onCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}