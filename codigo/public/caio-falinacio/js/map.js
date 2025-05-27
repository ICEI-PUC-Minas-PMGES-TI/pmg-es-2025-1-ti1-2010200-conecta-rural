var map;
const containerMapa = document.querySelector('#map');

function iniciarMapa(){
    map = new google.maps.Map(containerMapa,{
    center: {lat: -10.333, lng: -53.200},
    zoom: 4.5
    })
}