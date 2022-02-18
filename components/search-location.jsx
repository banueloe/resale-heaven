import React, { useState, useEffect, useRef } from "react";
import { TextField, Typography, Grid } from "@mui/material";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef, setLocations) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {
      types: [],
      componentRestrictions: { country: "us" },
      fields: ["place_id", "formatted_address", "url", "name"],
    }
  );
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, setLocations)
  );
}

async function handlePlaceSelect(updateQuery, setLocations) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  setLocations((prevLocations) => {
    let tempLocations = [...prevLocations];
    tempLocations.push(addressObject);
    return tempLocations;
  });
  updateQuery("");
  console.log(addressObject);
}

function SearchLocationInput({ setLocations }) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GCP_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef, setLocations)
    );
  }, []);

  return (
    <Grid item mb={2}>
      <Grid item mb={2}>
        <Typography>Please enter one location at a time: </Typography>
      </Grid>
      <div className="search-location-input">
        <input
          ref={autoCompleteRef}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter a City"
          value={query}
        />
      </div>
    </Grid>
  );
}

export default SearchLocationInput;

//Component from https://betterprogramming.pub/the-best-practice-with-google-place-autocomplete-api-on-react-939211e8b4ce
