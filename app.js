/* StAuth10244: I Your Name, YourStudentID certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else. */

let map;
let markers = [];

function initMap() {
  // Center the map on Hamilton, ON
  const hamilton = { lat: 43.2557, lng: -79.8711 };

  // Create the map instance in the 'map' div, including the Map ID
  map = new google.maps.Map(document.getElementById("map"), {
    center: hamilton,
    zoom: 12,
    mapId: 'f5da1a39c00f9de7'  // Your Map ID
  });

  // Load the initial markers on the map
  loadInitialMarkers();
}

function loadInitialMarkers() {
  // Array containing data for 10 Hamilton locations with specific categories
  const locations = [
    // Parks
    { 
      name: "Bayfront Park", 
      lat: 43.2560, 
      lng: -79.8710, 
      address: "Bayfront Rd, Hamilton, ON", 
      description: "A scenic park by the waterfront.", 
      category: "parks" 
    },
    { 
      name: "Gage Park", 
      lat: 43.2325, 
      lng: -79.8460, 
      address: "Gage Ave, Hamilton, ON", 
      description: "A historic park with beautiful gardens.", 
      category: "parks" 
    },
    { 
      name: "Clarke Field", 
      lat: 43.2750, 
      lng: -79.8500, 
      address: "Clarke St, Hamilton, ON", 
      description: "A popular park for sports and recreation.", 
      category: "parks" 
    },
    // Museums
    { 
      name: "Hamilton Museum of Steam & Technology", 
      lat: 43.2570, 
      lng: -79.8750, 
      address: "Museum Ln, Hamilton, ON", 
      description: "Discover Hamilton's industrial heritage.", 
      category: "museums" 
    },
    { 
      name: "Canadian Warplane Heritage Museum", 
      lat: 43.2500, 
      lng: -79.8800, 
      address: "Warplane Rd, Hamilton, ON", 
      description: "A collection of historic aircraft.", 
      category: "museums" 
    },
    // Waterfalls
    { 
      name: "Webster's Falls", 
      lat: 43.2330, 
      lng: -79.9780, 
      address: "Falls Rd, Hamilton, ON", 
      description: "A stunning waterfall in the Hamilton area.", 
      category: "waterfalls" 
    },
    { 
      name: "Tew's Falls", 
      lat: 43.2440, 
      lng: -79.9700, 
      address: "Falls Rd, Hamilton, ON", 
      description: "Another beautiful waterfall in Hamilton.", 
      category: "waterfalls" 
    },
    // Attractions
    { 
      name: "Dundurn Castle", 
      lat: 43.2530, 
      lng: -79.8680, 
      address: "Castle Rd, Hamilton, ON", 
      description: "A historic neoclassical mansion.", 
      category: "attractions" 
    },
    { 
      name: "Escarpment Trail", 
      lat: 43.2600, 
      lng: -79.8600, 
      address: "Trail Rd, Hamilton, ON", 
      description: "A scenic trail along the Niagara Escarpment.", 
      category: "attractions" 
    },
    { 
      name: "Hamilton Farmers' Market", 
      lat: 43.2580, 
      lng: -79.8760, 
      address: "Market St, Hamilton, ON", 
      description: "A bustling market featuring local produce.", 
      category: "attractions" 
    }
  ];

  // Reset the markers array
  markers = [];

  // Loop through each location and add a marker with an info window
  locations.forEach(location => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name
    });

    // Save the marker's category for filtering
    marker.category = location.category;

    // Create an info window for this marker
    const infowindow = new google.maps.InfoWindow({
      content: `<strong>${location.name}</strong><br>${location.address}<br>${location.description}`
    });

    // Open the info window when the marker is clicked
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });

    // Add the marker to our global markers array
    markers.push(marker);
  });
}

function filterMarkers(category) {
  markers.forEach(marker => {
    // If category is "all", display every marker; otherwise, display only those that match the category
    if (category === "all" || marker.category === category) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });
}

// Attach event listeners after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filter-all").addEventListener("click", () => {
    console.log("Filter All clicked");
    filterMarkers("all");
  });
  document.getElementById("filter-parks").addEventListener("click", () => {
    console.log("Filter Parks clicked");
    filterMarkers("parks");
  });
  document.getElementById("filter-museums").addEventListener("click", () => {
    console.log("Filter Museums clicked");
    filterMarkers("museums");
  });
  document.getElementById("filter-waterfalls").addEventListener("click", () => {
    console.log("Filter Waterfalls clicked");
    filterMarkers("waterfalls");
  });
  document.getElementById("filter-attractions").addEventListener("click", () => {
    console.log("Filter Attractions clicked");
    filterMarkers("attractions");
  });
});
