import { useState, useEffect } from 'react'
import Profile from './Profile';
import Login from './Login';


export default function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchTopics = async()=>{
      try{
        const response = await fetch(`https://mbaza-topics.vercel.app/api/topics`);
        const result = await response.json()
        setData(result)

      }catch(err){
        console.log(err)
      }
    }
    fetchTopics();

  },[])

  console.log(data)
  
  console.log(isLoggedIn)
  return (
    <>
    {/* {isLoggedIn ? <Profile name="Manzi"/> : <Login create="create" />}
    <button onClick={handleLogin} /> */}
         {data ? <p>Count: {data.count}</p> : <p>Loading...</p>}
         {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>}
         {data ? <p>Family: {data.Family?.[2]?.Family ?? "Not found"}</p> : <p>Loading...</p>}
         {data ? <p>Business: {data.Business?.[3]?.Family ?? "Not found"}</p> : <p>Loading...</p>}
         {data ? <p>Labour: {data.Labour?.[4]?.Labour ?? "Not found"}</p> : <p>Loading...</p>}
         {data ? <p>Land: {data.Land?.[5]?.Land ?? "Not found"}</p> : <p>Loading...</p>}

         {/* {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>}
         {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>}
         {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>}
         {data ? <p>Topics: {data.topics[1].category}</p> : <p>Loading...</p>} */}
    


    
    
    </>
  );


}
       
import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://mbaza-topics.vercel.app/api/topics";

export default function App() {
  // State zibika ibyo user yahisemo n'ibyo API yagaruye
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [delay, setDelay] = useState("0");
  const [simulate, setSimulate] = useState("");

  // States zo kwerekana Loading na Error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      setError("");

      try {
        // Gutegura parameters zijya muri URL
        const params = new URLSearchParams();

        if (category !== "All") {
          params.set("category", category);
        }

        if (search.trim() !== "") {
          params.set("search", search.trim());
        }

        if (delay !== "0") {
          params.set("delay", delay);
        }

        if (simulate !== "") {
          params.set("simulate", simulate);
        }

        const url = `${API_URL}?${params.toString()}`;

        // Gufetchinga data muri API
        const response = await fetch(url);

        // Gufata HTTP errors
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();

        // Kubika data muri state
        setData(result);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [search, category, delay, simulate]);

  // Categories zo muri dropdown
  const categories = ["All", "Labour"];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">M</span>
            <div>
              <h1>Mbaza Topics</h1>
              <p>Explore legal topics and information</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        {/* Search and filter controls */}
        <section className="controls">
          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search by title or summary..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Delay simulation */}
          <select
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
          >
            <option value="0">No delay</option>
            <option value="2000">2 seconds delay</option>
          </select>

          {/* Error and empty simulation */}
          <select
            value={simulate}
            onChange={(e) => setSimulate(e.target.value)}
          >
            <option value="">Normal mode</option>
            <option value="error">Simulate Error (500)</option>
            <option value="empty">Simulate Empty</option>
          </select>
        </section>

        {/* Topics heading */}
        <div className="section-heading">
          <div>
            <h2>Legal Topics</h2>
            <p>Browse topics and find the information you need.</p>
          </div>

          {!loading && !error && data && (
            <div className="count-badge">
              {data.count} Topics
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading topics...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="error-container">
            <div className="error-icon">!</div>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button
              onClick={() => {
                setSimulate("");
                setSearch("");
                setCategory("All");
              }}
            >
              Try again
            </button>
          </div>
        )}

        {/* Successful response */}
        {!loading && !error && data && (
          <>
            {/* Empty state */}
            {data.topics.length === 0 ? (
              <div className="empty-container">
                <div className="empty-icon">⌕</div>
                <h3>No topics found</h3>
                <p>
                  No topics match your search. Try a different keyword
                  or category.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setSimulate("");
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              /* Topic cards */
              <div className="topics-grid">
                {data.topics.map((topic) => (
                  <article className="topic-card" key={topic.id}>
                    <div className="card-top">
                      <span className="category-badge">
                        {topic.category}
                      </span>

                      {topic.isPopular && (
                        <span className="popular-badge">
                          ★ Popular
                        </span>
                      )}
                    </div>

                    <h3>{topic.title}</h3>

                    <p className="summary">
                      {topic.summary}
                    </p>

                    <div className="card-details">
                      <div className="detail-item">
                        <span className="detail-label">
                          Law Reference
                        </span>
                        <span className="detail-value">
                          {topic.lawReference || "Not provided"}
                        </span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">
                          Questions
                        </span>
                        <span className="detail-value">
                          {topic.questionsCount ?? 0}
                        </span>
                      </div>
                    </div>

                    <div className="card-footer">
                      <span>Topic #{topic.id}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <p>Mbaza Topics · React API Project</p>
      </footer>
    </div>
  );
}
               