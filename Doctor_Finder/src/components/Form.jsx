
import React, { useState, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import LocationSearch from "./GoogleMap/LocationSearch";

function Form() {
  const [question, setQuestion] = useState("");
  const [location, setLocation] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const aiRef = useRef(
    new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location || !location.lat || !location.lng) {
      alert("Please select a location from suggestions");
      return;
    }

    if (!question.trim()) {
      alert("Please enter symptoms");
      return;
    }

    setLoading(true);
    setDoctors([]);

    try {
      // 1️Gemini → Specialist
      const prompt = `
User symptoms: ${question}
Return ONLY the most relevant medical specialist.
ONE word only.
`;

      const geminiRes = await aiRef.current.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const specialist = geminiRes.text.trim();
      console.log("Specialist:", specialist);

      // 2️ Google Maps Places → Doctors
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.nearbySearch(
        {
          location: { lat: location.lat, lng: location.lng },
          radius: 5000,
          keyword: `${specialist} doctor`,
        },
        (results, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results
          ) {
            setDoctors(results);
          } else {
            setDoctors([]);
          }
          setLoading(false);
        }
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 400, margin: "40px auto" }}>
      <h2>Doctor Finder</h2>

      <form onSubmit={handleSubmit}>
        <LocationSearch onSelect={setLocation} />

        <input
          type="text"
          placeholder="Enter symptoms (e.g. fever, headache)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: "100%", marginTop: 10 }}
        />

        <button type="submit" style={{ marginTop: 10 }}>
          {loading ? "Searching..." : "Find Doctors"}
        </button>
      </form>

      <hr />

      {doctors.map((doc, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <strong>{doc.name}</strong><br />
          ⭐ {doc.rating || "N/A"}<br />
          📍 {doc.vicinity}
        </div>
      ))}

      {!loading && location && doctors.length === 0 && (
        <p>No doctors found</p>
      )}
    </div>
  );
}

export default Form;
