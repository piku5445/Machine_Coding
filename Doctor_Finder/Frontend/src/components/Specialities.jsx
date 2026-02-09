import React from "react";
import "./Specialities.css";

const specialities = [
  { name: "Cardiologist", icon: "🫀" },
  { name: "Dermatologist", icon: "🧴" },
  { name: "Pediatrician", icon: "👶" },
  { name: "Orthopedic", icon: "🦴" },
  { name: "Dentist", icon: "🦷" },
  { name: "Neurologist", icon: "🧠" },
  { name: "Gynecologist", icon: "🧑‍⚕" },
  { name: "General Physician", icon: "🩺" }
];

function Specialities() {
  return (
    <div className="special-main">

      <div className="special-card">
        <h2>🏥 Specialities</h2>

        <div className="special-grid">
          {specialities.map((item, index) => (
            <div key={index} className="special-item">
              <div className="special-icon">{item.icon}</div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Specialities;
