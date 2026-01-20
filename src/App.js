import React, { useState } from "react";
import './App.css';

const App = () => {
  const [setA, setSetA] = useState([1, 2, 3, 4, 8, 10, 66, 44]);
  const [setB, setSetB] = useState([2, 4, 10, 66]);

  const [newA, setNewA] = useState("");
  const [newB, setNewB] = useState("");

  const [editA, setEditA] = useState(false);
  const [editB, setEditB] = useState(false);

  const [response, setResponse] = useState(null);

  
  const isSubset = (A, B) => B.every(item => A.includes(item));

  
  const handleTestAPI = () => {
    const result = isSubset(setA, setB);

    setResponse({
      setBIsSubsetOfSetA: result,
      status: 200,
      message: result
        ? "Set comparison successful."
        : "Set B is NOT a subset of Set A."
    });
  };

  // Add / Remove Functions
  const addToSetA = () => {
    if (newA !== "" && !setA.includes(Number(newA))) {
      setSetA([...setA, Number(newA)]);
    }
    setNewA("");
  };

  const addToSetB = () => {
    if (newB !== "" && !setB.includes(Number(newB))) {
      setSetB([...setB, Number(newB)]);
    }
    setNewB("");
  };

  const removeFromSetA = index => {
    setSetA(setA.filter((_, i) => i !== index));
  };

  const removeFromSetB = index => {
    setSetB(setB.filter((_, i) => i !== index));
  };

  const clearSetA = () => setSetA([]);
  const clearSetB = () => setSetB([]);

  return (
    <div className="api-container">
      <h2>🔗 API Endpoint Simulation</h2>

      {/* -------- SET A -------- */}
      <div className="set-block">
        <div className="set-header">
          <h4>Set A Values</h4>
          <div>
            <button className="clear-btn" onClick={clearSetA}>Clear Set</button>
            <label className="edit-toggle">
              <input
                type="checkbox"
                checked={editA}
                onChange={() => setEditA(!editA)}
              />
              Edit
            </label>
          </div>
        </div>

        <div className="chips">
          {setA.map((num, i) => (
            <span className="chip" key={i}>
              {num}
              {editA && (
                <span className="cut" onClick={() => removeFromSetA(i)}>×</span>
              )}
            </span>
          ))}
        </div>

        {editA && (
          <div className="add-box">
            <input
              type="number"
              placeholder="Add number"
              value={newA}
              onChange={(e) => setNewA(e.target.value)}
            />
            <button onClick={addToSetA}>Add</button>
          </div>
        )}
      </div>

      {/* -------- SET B -------- */}
      <div className="set-block">
        <div className="set-header">
          <h4>Set B Values</h4>
          <div>
            <button className="clear-btn" onClick={clearSetB}>Clear Set</button>
            <label className="edit-toggle">
              <input
                type="checkbox"
                checked={editB}
                onChange={() => setEditB(!editB)}
              />
              Edit
            </label>
          </div>
        </div>

        <div className="chips">
          {setB.map((num, i) => (
            <span className="chip">
              {num}
              {editB && (
                <span className="cut" onClick={() => removeFromSetB(i)}>×</span>
              )}
            </span>
          ))}
        </div>

        {editB && (
          <div className="add-box">
            <input
              type="number"
              placeholder="Add number"
              value={newB}
              onChange={(e) => setNewB(e.target.value)}
            />
            <button onClick={addToSetB}>Add</button>
          </div>
        )}
      </div>

      {/* -------- TEST API -------- */}
      <button className="test-btn" onClick={handleTestAPI}>
        Test /api/is-subset (Simulate POST Request)
      </button>

      {/* -------- RESPONSE -------- */}
      {response && (
        <div className="response-box">
          <h4>Simulated API Response:</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;

