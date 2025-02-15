// StAuth10244: I Your Name, YourStudentID certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

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
    // Array containing data for 10 markers
    const locations = [
        { name: "Location 1", lat: 43.2600, lng: -79.8600, address: "Address 1", description: "Description 1", category: "type1" },
        { name: "Location 2", lat: 43.2610, lng: -79.8610, address: "Address 2", description: "Description 2", category: "type2" },
        { name: "Location 3", lat: 43.2620, lng: -79.8620, address: "Address 3", description: "Description 3", category: "type3" },
        { name: "Location 4", lat: 43.2630, lng: -79.8630, address: "Address 4", description: "Description 4", category: "type1" },
        { name: "Location 5", lat: 43.2640, lng: -79.8640, address: "Address 5", description: "Description 5", category: "type2" },
        { name: "Location 6", lat: 43.2650, lng: -79.8650, address: "Address 6", description: "Description 6", category: "type3" },
        { name: "Location 7", lat: 43.2660, lng: -79.8660, address: "Address 7", description: "Description 7", category: "type1" },
        { name: "Location 8", lat: 43.2670, lng: -79.8670, address: "Address 8", description: "Description 8", category: "type2" },
        { name: "Location 9", lat: 43.2680, lng: -79.8680, address: "Address 9", description: "Description 9", category: "type3" },
        { name: "Location 10", lat: 43.2690, lng: -79.8690, address: "Address 10", description: "Description 10", category: "type1" }
    ];

    // Reset the markers array in case this function is called again
    markers = [];

    // Loop through each location and add a marker to the map
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name
        });

        // Save the marker's category for potential filtering
        marker.category = location.category;

        // Create an info window with the location's details
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
