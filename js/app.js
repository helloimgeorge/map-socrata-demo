/*
    app.js
    our application code

    Alternative fuel locations in Chicago dataset:
    https://data.cityofchicago.org/resource/alternative-fuel-locations.json

    Chicago coordinates:
    lat: 41.8369
    lng: -87.6847
 */

"use strict";

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
      lat: 41.8369,
      lng: -87.6847
    };
    var map = new google.maps.Map(mapElem, {
      center: center,
      zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow(); // information window

    $.getJSON('https://data.cityofchicago.org/resource/alternative-fuel-locations.json')
        .done(function(data) {

            data.forEach(function(station) { // create each existing marker
                var marker = new google.maps.Marker({
                   position: {
                    lat: Number(station.location.latitude),
                    lng: Number(station.location.longitude)
                   },
                   map: map
                });


                google.maps.event.addListener(marker, 'click', function() {
                   var html = '<h2>' + station.station_name + '</h2>'; // html based off station name appended
                   html += '<p>' + station.street_address + '</p>'; // append address
                   infoWindow.setContent(html);
                   infoWindow.open(map, this); // this refers to the element that raised the event, in this case the 'marker'
                   // this is useful because if it was just labeled 'marker' instead, it would attach to the last iteration of the for loop
                   // but this changes within each cycle
                });
            });
        })
        .fail(function(error) {
            console.log(error); // shows error

        })
        .always(function() { // turn off ajax spider
            $('#ajax-loader').fadeOut(); // makes the spinny thing disappear
        });
});


// Our challenge is to figure out how to filter
// When you want to remove a marker, you're going to want to pass a null to the set function so that it's no longer shown
// *Side Note* Geocoding service can turn an address and give you the coordinates (long/lat)