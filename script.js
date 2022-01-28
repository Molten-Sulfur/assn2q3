// Initialize my own map
var map = L.map('crimeMap').setView([37.755432, -122.429865], 12);

// Initialize the basemap
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}).addTo(map);


// Use jQuery to grab Greg's SF crime data
jQuery.getJSON("https://raw.githubusercontent.com/gbrunner/adv-programming-for-gis-and-rs/f94237ceb15208e985207e7f3d48e292d330a6fa/Web%20Development%20Module/Unit%201%20-%20GitHub%20and%20Leaflet/sf_crime.geojson",function(data) {
    // next we gotta make an array of the coordinates of each crime: an array of arrays
    var locations = data.features.map(function(crimeMap) {
      var location = crimeMap.geometry.coordinates.reverse();
      return location;
    });
    
    // next we create a layer based on that array of arrays and add it to the map
    var heat = L.heatLayer(locations, { radius: 20 });
    map.addLayer(heat);
  });
