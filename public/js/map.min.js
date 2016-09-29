window.onload = function() {
  var latlng = new google.maps.LatLng(22.2158187, -97.8407089);
  var map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: 'Set lat/lon values for this property',
      draggable: true
  });
  google.maps.event.addListener(marker, 'dragend', function(a) {
      $(document).ready(function(){
          $("input#latitudLugar").val(a.latLng.lat());
          $("input#longitudLugar").val(a.latLng.lng());
        });
  });
};
