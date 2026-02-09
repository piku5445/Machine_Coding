
import { useEffect, useRef } from "react";

function LocationSearch({ onSelect }) {
  const inputRef = useRef(null);

  useEffect(() => {
    let autocomplete;

    async function initAutocomplete() {
      // Load Google Maps JS (new API)
      const { Autocomplete } = await google.maps.importLibrary("places");

      autocomplete = new Autocomplete(inputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        onSelect({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      });
    }

    if (window.google && window.google.maps) {
      initAutocomplete();
    } else {
      console.error("Google Maps not loaded");
    }
  }, [onSelect]);

  return (
    <input
      ref={inputRef}
      placeholder="Search location"
      style={{ width: "100%", padding: "8px" }}
    />
  );
}

export default LocationSearch;
