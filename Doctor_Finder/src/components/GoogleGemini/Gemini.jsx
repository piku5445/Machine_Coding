import { useRef, forwardRef, useImperativeHandle } from "react";
import { GoogleGenAI } from "@google/genai";

const Gemini = forwardRef(
  ({ question, location, setDoctors, setLoading }, ref) => {

    const aiRef = useRef(
      new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      })
    );

    // 🔑 Expose this function to Form.jsx
    useImperativeHandle(ref, () => ({
      runGeminiSearch,
    }));

    async function runGeminiSearch() {
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
        // 1️⃣ Gemini → Specialist
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

        // 2️⃣ Google Maps → Doctors
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
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
        setLoading(false);
      }
    }

    return null; // 👈 no UI
  }
);

export default Gemini;
