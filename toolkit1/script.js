(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([45.503825, -122.770634], 13);
    // var map = L.map('map').setView([51.505, -0.09], 13);


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // marker 1
    var marker = L.marker([45.503825, -122.770634]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am popup number 1.").openPopup();

    // marker 2
    var marker2 = L.marker([45.49997, -122.800026]).addTo(map);
    marker2.bindPopup("<b>Hello world!</b><br>I am popup number 2.").openPopup();


     // marker 3
     var marker3 = L.marker([45.511665, -122.795662]).addTo(map);
     marker3.bindPopup("<b>Hello world!</b><br>I am popup number 3.").openPopup();


    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);


}());