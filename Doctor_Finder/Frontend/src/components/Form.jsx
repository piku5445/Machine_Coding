import React, { useState, useRef } from "react";
import LocationSearch from "./GoogleMap/LocationSearch";
import Gemini from "./GoogleGemini/Gemini";
import List from "./List";
import "./Form.css";

function Form() {
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const geminiRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    geminiRef.current?.runGeminiSearch();
  };
return (
  <div className="main-container">

    <div className="form-container">
      <h2>🏥 Doctor Finder</h2>
     
      <Gemini
        ref={geminiRef}
        question={question}
        location={location}
        setDoctors={setDoctors}
        setLoading={setLoading}
      />
      <label htmlFor="">Location</label>
      <form onSubmit={handleSubmit}>
        <LocationSearch onSelect={setLocation} />
        <label>Symptoms</label>
        <input
        
          type="text"
          placeholder="Enter symptoms (e.g. fever, headache)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button type="submit">
          {loading ? "Searching..." : "Find Doctors"}
        </button>
      </form>

      {!loading && location && doctors.length === 0 && (
        <p className="no-results">No doctors found</p>
      )}
    </div>

  
    <div className="cards-container">
      <List doctors={doctors} />
    </div>

  </div>
);

}

export default Form;