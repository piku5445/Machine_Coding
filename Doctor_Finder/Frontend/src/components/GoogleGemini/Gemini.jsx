
import { forwardRef, useImperativeHandle } from "react";

const Gemini = forwardRef(
  ({ question, location, setDoctors, setLoading }, ref) => {

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
        // 🔥 Call Express backend instead of Gemini directly
        const response = await fetch("http://localhost:5000/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        });

        const data = await response.json();

        if (!data.specialist) {
          throw new Error("No specialist returned");
        }

        const specialist = data.specialist;
        console.log("Specialist:", specialist);

        // 🗺 Google Maps → Doctors (same as before)
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

    return null;
  }
);

export default Gemini;
