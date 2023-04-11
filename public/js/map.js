let map;

async function initMap() {
  const location = { lat: 43.66, lng: -79.39 };
  // Load the necessary libraries
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
  // Create the map
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: location,
  });
  // Add a marker
  const marker = new AdvancedMarkerView({
    map: map,
    position: location,
    title: "Clinic",
  });
}

initMap();
