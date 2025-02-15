// StAuth10244: I Your Name, YourStudentID certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

let map;  // Global variable to hold the map instance

function initMap() {
    // Define the center of the map (Hamilton, ON as an example)
    const hamilton = { lat: 43.2557, lng: -79.8711 };

    // Create a new map instance and display it in the 'map' div
    map = new google.maps.Map(document.getElementById("map"), {
        center: hamilton,
        zoom: 12,
    });
}
