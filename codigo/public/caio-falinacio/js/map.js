var map;
var OpcoesMapa = {
    center: {lat: -10.333, lng: -53.200},
    zoom: 4.5,
    mapTypeId: 'satellite'
}
const containerMapa = document.querySelector('#map');

function iniciarMapa(){
    map = new google.maps.Map(containerMapa, OpcoesMapa);
}