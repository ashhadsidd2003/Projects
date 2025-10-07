import React, { useState } from "react";
import { Client, Databases, ID, Query } from "appwrite";
import defaultRoadmap from "./defaultRoadmap";
import "./App.css";
import { ChevronRight, ChevronDown } from "lucide-react";


const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address (e.g. ashhad@gmail.com)");
      return;
    }

    setLoading(true);

    try {
      const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("email", email),
      ]);

      if (res.total > 0) {
        const existing = res.documents[0];
        const parsed = JSON.parse(existing.roadmap);
        setRoadmap(parsed);
      } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          email,
          roadmap: JSON.stringify(defaultRoadmap),
        });
        setRoadmap(defaultRoadmap);
      }
    } catch (err) {
      console.error("Error fetching/creating:", err);
      setError("Database error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const saveRoadmapToDB = async (updatedRoadmap) => {
    try {
      const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("email", email),
      ]);

      if (res.total > 0) {
        const docId = res.documents[0].$id;

        await database.updateDocument(DATABASE_ID, COLLECTION_ID, docId, {
          roadmap: JSON.stringify(updatedRoadmap),
        });
      }
    } catch (err) {
      console.error("Error saving roadmap:", err);
    }
  };

  const getSubtopicPercent = (sub) => {
    const total = sub.items.length;
    const done = sub.items.filter((i) => i.done).length;
    return Math.round((done / total) * 100);
  };

  const getTopicPercent = (topic) => {
    const subtopicPercents = topic.subtopics.map((sub) => getSubtopicPercent(sub));
    const totalPercent = subtopicPercents.reduce((sum, val) => sum + val, 0);
    const avg = totalPercent / topic.subtopics.length;
    return Math.round(avg);
  };

  const getOverallProgress = () => {
    if (!roadmap || roadmap.length === 0) return 0;
    const totalPercent = roadmap.map((t) => getTopicPercent(t)).reduce((a, b) => a + b, 0);
    return Math.round(totalPercent / roadmap.length);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">DevTrack</h1>
      {!roadmap ? (
        <>
        <p className="app-intro">
            {`Ever felt lost in what to study next? Unsure what you’ve already mastered and what’s left?
             I used to feel the same while learning software development, so I built this tracker.
             Just enter your email and start keeping a clear record of your progress across DSA, Web Dev, OOP, and more.
             Your entire journey is now organized, visual, and motivating.`}
        </p>

        <form className="email-form" onSubmit={handleEmailSubmit}>
          <h2>Enter your email to view roadmap</h2>
          <input
            type="text"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Continue"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        </>
      ) : (
        <div className="roadmap-section">
          <div className="header">
            <h1>Welcome</h1>
            <h2>{email}</h2>
            <h3>Your progress: {getOverallProgress()}%</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${getOverallProgress()}%` }}
              ></div>
            </div>
          </div>

          {roadmap.map((topic, tIndex) => (
            <div key={tIndex} className="topic">
              <button
                className="topic-button"
                onClick={() => {
                  const updated = [...roadmap];
                  updated[tIndex].expanded = !updated[tIndex].expanded;
                  setRoadmap(updated);
                }}
              >
                <span>{topic.expanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>} {topic.title}</span>
                <span>{getTopicPercent(topic)}%</span>
              </button>

              {topic.expanded && (
                <div className="subtopic-container">
                  {topic.subtopics.map((sub, sIndex) => (
                    <div key={sIndex} className="subtopic">
                      <button
                        className="subtopic-button"
                        onClick={() => {
                          const updated = [...roadmap];
                          updated[tIndex].subtopics[sIndex].expanded =
                            !updated[tIndex].subtopics[sIndex].expanded;
                          setRoadmap(updated);
                        }}
                      >
                        <span>{sub.expanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>} {sub.title}</span>
                        <span>{getSubtopicPercent(sub)}%</span>
                      </button>

                      {sub.expanded && (
                        <ul className="item-list">
                          {sub.items.map((item, iIndex) => (
                            <li key={iIndex}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={item.done}
                                  onChange={async () => {
                                    const updated = [...roadmap];
                                    updated[tIndex].subtopics[sIndex].items[iIndex].done =
                                      !item.done;
                                    setRoadmap(updated);
                                    await saveRoadmapToDB(updated);
                                  }}
                                />{" "}
                                {item.name}
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
