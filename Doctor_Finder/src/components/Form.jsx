// import React, { useState, useRef } from "react";
// import LocationSearch from "./GoogleMap/LocationSearch";
// import Gemini from "./GoogleGemini/Gemini";
// import  "./Form.css";
// function Form() {
//   const [question, setQuestion] = useState("");
//   const [location, setLocation] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const geminiRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     geminiRef.current?.runGeminiSearch();
//   };

//   return (
//     <div style={{ width: 400, margin: "40px auto" }}>
//       <h2>Doctor Finder</h2>

//       {/* Gemini logic only */}
//       <Gemini
//         ref={geminiRef}
//         question={question}
//         location={location}
//         setDoctors={setDoctors}
//         setLoading={setLoading}
//       />

//       <form onSubmit={handleSubmit}>
//         <LocationSearch onSelect={setLocation} />

//         <input
//           type="text"
//           placeholder="Enter symptoms (e.g. fever, headache)"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           style={{ width: "100%", marginTop: 10 }}
//         />

//         <button type="submit" style={{ marginTop: 10 }}>
//           {loading ? "Searching..." : "Find Doctors"}
//         </button>
//       </form>

//       <hr />

//       {doctors.map((doc, i) => (
//         <div key={i} style={{ marginBottom: 10 }}>
//           <strong>{doc.name}</strong><br />
//           ⭐ {doc.rating || "N/A"}<br />
//           📍 {doc.vicinity}
//         </div>
//       ))}

//       {!loading && location && doctors.length === 0 && (
//         <p>No doctors found</p>
//       )}
//     </div>
//   );
// }

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

      <form onSubmit={handleSubmit}>
        <LocationSearch onSelect={setLocation} />

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