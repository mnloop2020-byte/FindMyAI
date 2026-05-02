interface SearchBarProps {
  onSearch: (value: string) => void;
  // value: string means // SearchBar.tsx
}

// الكومبوننت هنا
export default function SearchBar({ onSearch }: SearchBarProps) {
    // onSearch is a function that takes a string value and returns void (doesn't return anything)
    // onSearch is a prop that will be passed to the SearchBar component when it is used in App.tsx
  return (
    <div className="search-wrapper">

<input
      type="text"
      className="search-input"
      placeholder = " 🔍  Search..."
      onChange={(e) => onSearch(e.target.value)}
    />
        
    </div>
    
  );
}
