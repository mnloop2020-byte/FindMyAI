import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import ToolsGrid from "./components/ToolsGrid";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import { Routes, Route, useNavigate } from "react-router-dom";

// Roustes means that we define different paths in our application and specify which components should be rendered when the user navigates to those paths.
// Routes is a container for Route components, and it ensures that only the first matching route is rendered.

export interface Tool {
  name: string;
  description: string;
  category: "Chat" | "Image" | "Video" | "Code" | "Audio" | "Productivity";
  url: string;
  isFree: boolean;
  isNew: boolean;
  isPopular: boolean;
}

function App() {
  const navigate = useNavigate();
  // we use it to programmatically navigate between different routes in our application,
  //  allowing us to change the URL and render different components based on user interactions or application state changes.

  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    const matchSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    // essentially for searching for a tool by name, it checks if the tool's name includes the search term (case-insensitive)
    const matchCategory = category === "All" || tool.category === category;
    return matchSearch && matchCategory;
    // essentially it checks if the tool matches both the search term and the selected category (or if "All" is selected, it ignores the category filter)
  });




  // Modern way - async/await
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch("/tools.json");
        const data = await res.json();
        setTools(data);
        setLoading(false);
      } catch {
        setError("حصل خطأ في تحميل الأدوات!");
        setLoading(false);
      }
    };

    fetchTools();
  }, []);
  // [] means that this effect will only run once when the component mounts, similar to componentDidMount in class components. It won't run again on updates or unmounts.

  return (
    <div className="app">
      
      <Routes>
        {/* means this is the default route, it will be rendered when the user navigates to the root path */}
        {/* صفحة Welcome */}
        <Route
          path="/"
          element={<Welcome onExplore={() => navigate("/tools")} />}
          //  we using the navigate to move the user to the /tools
          // route when they click the "Explore" button on the Welcome component. This allows us to programmatically change the URL and render the Tools page without needing a traditional link.
        />
        {/* useNavigate = الانتقال من صفحة إلى صفحة برمجيًا
navigate("/path") = تذهب إلى صفحة محددة
navigate(-1) = ترجع صفحة واحدة في history
لا يحدث full page reload
React Router يتحكم بالـ URL ويعرض المكون المناسب 
| الموضوع  | وظيفة                                                       |
| -------- | ----------------------------------------------------------- |
| Route    | يحدد: إذا URL معين → أي Component يظهر                      |
| navigate | ينقلك فعليًا إلى URL معين → يظهر component الذي حددته Route |
Route يحدد القواعد، navigate ينفذها. 🎯



*/}
        {/* صفحة Tools */}
        <Route
          path="/tools"
          element={
            <>
              <Header
                onBack={() => navigate("/")}
                
              />

              <main>
                <CategoryFilter category={category} onCategory={setCategory} />
                <SearchBar onSearch={setSearch} />
                {loading && <p className="status-msg">⏳ جاري التحميل...</p>}
                {error && <p className="status-msg error">{error}</p>}
                {!loading && !error && <ToolsGrid tools={filteredTools} />}
              </main>
              <Footer />
            </>
          }
        />
        
        
        
       
      </Routes>
    </div>
  );
}

export default App;
