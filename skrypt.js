markery=[];
kolka=[];
mark=false;
kol=false;
pop=false;
popupu=[];
wmslist=[];
$(document).ready(function(){
	var Opsm="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var map = new L.Map('map');
var osm = new L.TileLayer(Opsm, {maxZoom: 50, attribution: osmAttrib});
var widok=new L.LatLng(51.7813, 16.8369);
var zum=12;
map.setView(widok,zum);
map.addLayer(osm);

	
$(".markerAdd").click(function() {
	
	$( this ).css( "background-color", "green");
	mark=true;
});

$(".markerRemove").click(function() {
		for (var i=0;i<markery.length;i++) {
			map.removeLayer(markery[i]);
		}
	});
	
$(".circleAdd").click(function(){
	$( this ).css( "background-color", "green");
	kol=true;

});

$(".circleRemove").click(function() {
		for (var i=0;i<kolka.length;i++) {
			map.removeLayer(kolka[i]);
			
		}
	});


$(".PopupAdd").click(function() {
	$( this ).css( "background-color", "green");
	pop=true;
});

$(".PopupRemove").click(function() {
		for (var i=0;i<popupy.length;i++) {
			map.removeLayer(popupy[i]);
		}
	});
$(".poczatek").click(function() {
		map.setView(widok,zum);
	});

map.on('click', function(e) {
		if (mark) {
			
			var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
			markery.push(marker);
			mark=false;
			$('.markerAdd').css( "background-color", "#63E852");
		}
		
		else if (kol){
			var promien = prompt("Podaj promień koła:");
			var circle = L.circle([e.latlng.lat, e.latlng.lng], promien, {color: 'red',fillColor: '#f03',fillOpacity: 0.5}).addTo(map);
			kolka.push(circle);
			kol=false;
			$('.circleAdd').css( "background-color", "#63E852");
		}
		else if (pop){
			var komunikat = prompt("Podaj komunikat");
			var popup = L.popup()
    			.setLatLng(e.latlng)
   			 	.setContent(komunikat.toString())
   				.openOn(map);
   				popupy.push(popup);
				pop=false;
				$('.PopupAdd').css( "background-color", "#63E852");
		}

	});
$('.gminyAdd').click(function() {

	var gminy = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/PZGIKINSP/guest/services/G2_PRGJT_WMS/MapServer/WMSServer', {
	    format: 'img/png',
	    transparent: true,
	    layers: 'Granice_gmin',
	}).addTo(map);
	wmslist.push(gminy);
});

$('.ortofotoAdd').click(function() {

	var orto = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer', {
	    format: 'img/png',
	    transparent: true,
	    layers: 'Raster',
	}).addTo(map);
	wmslist.push(orto);
});

$('.dzialkiAdd').click(function() {

	var dzialki = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/pub/guest/G2_GO_WMS/MapServer/WMSServer', {
	    format: 'img/png',
	    transparent: true,
	    layers: 'Dzialki',
	}).addTo(map);
	wmslist.push(dzialki);
	
	var dzialkinr = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/pub/guest/G2_GO_WMS/MapServer/WMSServer', {
	    format: 'img/png',
	    transparent: true,
	    layers: 'NumeryDzialek',
	}).addTo(map);
	wmslist.push(dzialkinr);
});

$('.budynkiAdd').click(function() {

	var budynki = L.tileLayer.wms('http://mapy.geoportal.gov.pl/wss/service/pub/guest/G2_BDOT_BUD_2010/MapServer/WMSServer', {
	    format: 'img/png',
	    transparent: true,
	    layers: '5',
	}).addTo(map);
	wmslist.push(budynki);

});

$('.wmsRemove').click(function() {
	for (var i=0;i<wmslist.length;i++) {
			map.removeLayer(wmslist[i]);
		}
});








});
