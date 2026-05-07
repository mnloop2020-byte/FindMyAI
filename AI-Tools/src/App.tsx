import { useState, useEffect } from "react";
import "./index.css";
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import ToolsGrid from "./components/ToolsGrid";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import { Routes, Route, useNavigate } from "react-router-dom";

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

  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    const matchSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || tool.category === category;
    return matchSearch && matchCategory;
  });

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

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Welcome onExplore={() => navigate("/tools")} />}
        />
        <Route
          path="/tools"
          element={
            <>
              <Header onBack={() => navigate("/")} />
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

      {/* Chatbot يظهر في كل الصفحات */}
      <Chatbot />
    </div>
  );
}

export default App;