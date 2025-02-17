/* StAuth10244: I Your Name, YourStudentID certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else. */

let map;
let markers = [];
let userMarker; 

function initMap() {
  // Center the map on Hamilton, ON
  const hamilton = { lat: 43.2557, lng: -79.8711 };

  // Create the map instance in the 'map' div, including the Map ID
  map = new google.maps.Map(document.getElementById("map"), {
    center: hamilton,
    zoom: 12,
    mapId: 'f5da1a39c00f9de7'
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
      lat: 43.27178853013442, 
      lng: -79.8723837, 
      address: "Bayfront Rd, Hamilton, ON", 
      description: "A scenic park by the waterfront.", 
      category: "parks" 
    },
    { 
      name: "Gage Park", 
      lat: 43.248243235221615,
      lng:  -79.82927017500252, 
      address: "Gage Ave, Hamilton, ON", 
      description: "A historic park with beautiful gardens.", 
      category: "parks" 
    },
    { 
      name: "Clarke Field", 
      lat:43.26731975181228, 
      lng:-79.84917566550568, 
      address: "Clarke St, Hamilton, ON", 
      description: "A popular park for sports and recreation.", 
      category: "parks" 
    },
    // Museums
    { 
      name: "Hamilton Museum of Steam & Technology", 
      lat: 43.25650159106572, 
      lng: -79.7716352294601 , 
      address: "Museum Ln, Hamilton, ON", 
      description: "Discover Hamilton's industrial heritage.", 
      category: "museums" 
    },
    { 
      name: "Canadian Warplane Heritage Museum", 
      lat: 43.16003484119541,
      lng:  -79.9249980871356, 
      address: "Warplane Rd, Hamilton, ON", 
      description: "A collection of historic aircraft.", 
      category: "museums" 
    },
    // Waterfalls
    { 
      name: "Webster's Falls", 
      lat: 43.27640176703521,
      lng:  -79.98066956218034, 
      address: "Falls Rd, Hamilton, ON", 
      description: "A stunning waterfall in the Hamilton area.", 
      category: "waterfalls" 
    },
    { 
      name: "Tew's Falls", 
      lat: 43.28175205575606, 
      lng: -79.97752315820075, 
      address: "Falls Rd, Hamilton, ON", 
      description: "Another beautiful waterfall in Hamilton.", 
      category: "waterfalls" 
    },
    // Attractions
    { 
      name: "Dundurn Castle", 
      lat: 43.269659272680634, 
      lng: -79.88425703131037, 
      address: "Castle Rd, Hamilton, ON", 
      description: "A historic neoclassical mansion.", 
      category: "attractions" 
    },
    { 
      name: "Escarpment Trail", 
      lat:43.287904872677906, 
      lng: -79.93619405676071, 
      address: "Trail Rd, Hamilton, ON", 
      description: "A scenic trail along the Niagara Escarpment.", 
      category: "attractions" 
    },
    { 
      name: "Hamilton Farmers' Market", 
      lat: 43.25926201944987, 
      lng: -79.87001105829586, 
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
        content: `<strong>${location.name}</strong><br>${location.address}<br>${location.description}<br>
                  <a href="#" onclick="getDirections(${location.lat}, ${location.lng})">Get Directions</a>`
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

// Geolocation function to get and show the user's current location
function showUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // Remove the previous user marker if it exists
        if (userMarker) {
          userMarker.setMap(null);
        }
        const customIcon = {
          url: "images/Unknown.png",
          scaledSize: new google.maps.Size(30, 30)
        };
        // Create and add the user marker to the map
        userMarker = new google.maps.Marker({
          position: userPos,
          map: map,
          icon: customIcon,
          title: "Your Location"
        });
        // center the map on the user's location
        map.setCenter(userPos);
      },
      (error) => {
        alert("Error getting location: " + error.message);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
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
  
  // Attach event listener for the geolocation button
  document.getElementById("btn-geolocate").addEventListener("click", showUserLocation);
});

// Function to geocode an address and return the location via callback
function geocodeAddress(address, callback) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results[0]) {
        callback(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  // Event listener for the New Marker Form submission
document.getElementById("marker-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values from the form inputs
  const name = document.getElementById("markerName").value;
  const address = document.getElementById("markerAddress").value;
  const description = document.getElementById("markerDescription").value;
  const category = document.getElementById("markerCategory").value;

  // Check if the address field is not empty (basic validation)
  if (!address) {
    alert("Please enter a valid address.");
    return;
  }

  // Use the geocodeAddress function to convert the address into coordinates
  geocodeAddress(address, function(location) {
    // Create a new marker at the geocoded location
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: name
    });

    // Assign the category to the marker for filtering purposes
    marker.category = category;

    const infowindow = new google.maps.InfoWindow({
        content: `<strong>${location.name}</strong><br>${location.address}<br>${location.description}<br>
                  <a href="#" onclick="getDirections(${location.lat}, ${location.lng})">Get Directions</a>`
      });

    // Add an event listener to open the info window when the marker is clicked
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });

    // Add the new marker to the global markers array
    markers.push(marker);

    // Optionally, center the map on the new marker
    map.setCenter(location);

    // Clear the form inputs after successfully adding the marker
    document.getElementById("marker-form").reset();
  });
});
// Function to get directions from the user's location to a destination
function getDirections(destLat, destLng) {
  if (userMarker) {
    const userPos = userMarker.getPosition();
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userPos.lat()},${userPos.lng()}&destination=${destLat},${destLng}`;
    window.open(directionsUrl, '_blank');
  } else {
    alert("Please set your current location using the 'Show My Location' button first.");
  }
}
