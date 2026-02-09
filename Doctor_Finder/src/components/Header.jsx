import React from "react";
import "./Header.css";

function Header({ handleTab }) {
  return (
    <div className="header">
      <div className="logo">
        🏥 DoctorFinder
      </div>

      <div className="nav-buttons">
        <button onClick={() => handleTab("Form")}>Find Doctors</button>
        <button onClick={() => handleTab("Specialities")}>Specialities</button>
        <button onClick={() => handleTab("Setting")}>Settings</button>
      </div>
    </div>
  );
}

export default Header;
