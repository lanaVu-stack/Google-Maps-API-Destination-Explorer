(function () {
  var map;
  var infoWindow;

  window.onload = function () {
    var options = {
      zoom: 4,
      center: new google.maps.LatLng(39.8283, -98.5795),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#b0c1db" }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#fff7f5" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#5c71ad" }]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#333033" }]
        }
      ]
    };

    map = new google.maps.Map(document.getElementById("map"), options);
    infoWindow = new google.maps.InfoWindow();

    var locations = [
      {
        title: "🗽 Times Square",
        markerLabel: "NY",
        position: new google.maps.LatLng(40.756054, -73.986951),
        description: "A major entertainment and commercial center in Midtown Manhattan.",
        type: "Landmark"
      },
      {
        title: "★ Central Park",
        markerLabel: "★",
        position: new google.maps.LatLng(40.785091, -73.968285),
        description: "A large urban park in New York City known for walking paths, scenic views, and recreation.",
        type: "Park"
      },
      {
        title: "🐯 Towson University",
        markerLabel: "TU",
        position: new google.maps.LatLng(39.3930, -76.6120),
        description: "A public university in Maryland and the location connected to this student web mapping project.",
        type: "University"
      },
      {
        title: "★ Baltimore Inner Harbor",
        markerLabel: "★",
        position: new google.maps.LatLng(39.2867, -76.6122),
        description: "A waterfront area in Baltimore with shops, restaurants, museums, and tourist attractions.",
        type: "City Landmark"
      },
      {
        title: "🗼 Seattle Space Needle",
        markerLabel: "SEA",
        position: new google.maps.LatLng(47.6205, -122.3493),
        description: "An iconic observation tower and landmark in Seattle, Washington.",
        type: "Seattle Landmark"
      }
    ];

    for (var i = 0; i < locations.length; i++) {
      createMarker(locations[i]);
    }
  };

  function createMarker(location) {
    var marker = new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.title,
      animation: google.maps.Animation.DROP,
      label: {
        text: location.markerLabel,
        color: "#ffffff",
        fontSize: "12px",
        fontWeight: "bold"
      }
    });

    google.maps.event.addListener(marker, "click", function () {
      openLocationWindow(marker, location);
    });
  }

  function openLocationWindow(marker, location) {
    var lat = location.position.lat();
    var lng = location.position.lng();

    var detailDiv = document.createElement("div");
    detailDiv.className = "detail-map";

    var content = document.createElement("div");
    content.className = "info-card";

    content.innerHTML =
      '<div class="info-card-inner">' +
        '<h2 class="info-card-title">' + location.title + '</h2>' +
        '<p class="info-type">' + location.type + '</p>' +
        '<p class="info-description">' + location.description + '</p>' +
        '<a class="info-button" href="https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng + '" target="_blank">' +
        'Open in Google Maps</a>' +
      '</div>';

    content.querySelector(".info-card-inner").appendChild(detailDiv);

    infoWindow.setContent(content);
    infoWindow.open(map, marker);

    setTimeout(function () {
      var detailMap = new google.maps.Map(detailDiv, {
        zoom: 15,
        center: location.position,
        mapTypeId: map.getMapTypeId(),
        disableDefaultUI: true
      });

      new google.maps.Marker({
        position: location.position,
        map: detailMap,
        clickable: false
      });
    }, 200);
  }
})();