
var map;
var markerList = [];
var curveColors = ['#000000','#FF0000','#0000CD','#CD853F','#FF5500','#FF00FF','6600FF'];
var selectedIndex = -1;

var tileProviders = [4];
var currentProvider = 0;
var providerButtons = [4];
var collisionLayer = null;

function initOpenStreetMaps(currentTrip){
    var mapInfo = currentTrip.mapInfo;
    var mapCanvas = document.getElementById('map');
  
     if (map != null) {
        map.remove();
        map = null;
        selectedIndex = -1;
        selectedLocation = null;
    }

    // Create a map object
    map = new L.map(mapCanvas,{
        zoomDelta: 0.5,
        zoomSnap: 0, 
        zoomControl: false
    });
    
        
    map.fitBounds([
        [mapInfo.bounds[0], mapInfo.bounds[1]],
        [mapInfo.bounds[2], mapInfo.bounds[3]]
    ]);
    
    tileProviders[0] = L.tileLayer.provider('OpenStreetMap.Mapnik');
    tileProviders[1] = L.tileLayer.provider('Stamen.Terrain')
    tileProviders[2] = L.tileLayer.provider('Esri.WorldImagery');
    tileProviders[3] = L.tileLayer.provider('Stamen.Watercolor');
    
    tileProviders[currentProvider].addTo(map);
    
    collisionLayer = L.LayerGroup.collision({margin:0});
    
    addCurvesToMap(currentTrip.stops);
    addMapMarkers(currentTrip.stops);  
}

function showBounds (e) {
    var bounds = map.getBounds();
    var corner1 = bounds.getNorthWest();
    var lat1 = corner1.lat.toFixed(6);
    var lng1 = corner1.lng.toFixed(6);
    var corner2 = bounds.getSouthEast();
    var lat2 = corner2.lat.toFixed(6);
    var lng2 = corner2.lng.toFixed(6);
        
	alert(lat1 + "," + lng1 + "," + lat2 + "," + lng2);
}


function showCoordinates (e) {
	      alert(e.latlng);
      }

      function centerMap (e) {
	      map.panTo(e.latlng);
      }

      function zoomIn (e) {
	      map.zoomIn();
      }

      function zoomOut (e) {
	      map.zoomOut();
      }



function addMapMarkers(stops){
    for(var i = 0; i < markerList.length; i++) {
        map.removeLayer(markerList[i]);
    }
    markerList = [];
    
    
    
    for(var i = 0; i < stops.length; i++){
        if(stops[i].stop == 3)
            continue;

        var loc = stops[i].loc;
        var radius = stops[i].stop;
        var color;
        
        switch(radius){
            case 0:
                radius = 5;
                color = "#ff7800";
                break;
            case 1:
                radius = 4;
                color = "#000000";
                break;
            case 2:
                radius = 8;
                color = "#ff0000";
                break;
  
            default:
                radius = 10;
                color = "#ff0000";
        }
        
        var marker =  new L.CircleMarker([loc[0],loc[1]], {
            radius: radius,
            fillColor: color,
            color: "#000",
            weight: 1.7,
            opacity: 1,
            fillOpacity: 1,
        });

        marker.addTo(map);
        markerList.push(marker);
        
     
        
        var labelClass = 'city-label city-label-0';

        var label = L.marker([loc[0],loc[1]],  {
            icon: L.divIcon({
                iconAnchor:[-10,11],
                className: 'labelMarker',
                html:"<div class='" + labelClass + "'>" + stops[i].title + "</div>"
            }),
            interactive: false,
            clickable:   false,
            });
            
        collisionLayer.addLayer(label);
        
            
        //label.addTo(map);
    } 
    
    collisionLayer.addTo(map);
}


function addCurvesToMap(stops){

    for (var i = 0; i < stops.length - 1; i++){
        var stop = stops[i];
        var nextStop = stops[i + 1];
        
        if(stop.mode > 10)
            continue;
                        
        var curve = calcCurve(L.point(stop.loc[1],stop.loc[0]),
                       L.point(nextStop.loc[1], nextStop.loc[0]),stop.curvature);
                        
        curve.setStyle({color: curveColors[stop.mode % 10], weight:1.5});
        curve.addTo(map);
    }
}


// calculate curve
function calcCurve(p1,p2,curvature){
var  e = new L.point(p2.x - p1.x, p2.y - p1.y),  // endpoint (p2 relative to p1)
     m = new L.point(e.x / 2, e.y / 2),          // midpoint
     o = new L.point(-e.y, e.x),                 // orthogonal
     c = new L.point(m.x + curvature * o.x, m.y + curvature * o.y); // curve control point
     return L.curve(['M',[p1.y,p1.x],'Q',[p1.y + c.y,p1.x + c.x],[p2.y,p2.x]]);
}


// user clicked on a destination so pulse the marker
function stopItemClicked(index) {
    if(selectedLocation != null){
        map.removeLayer(selectedLocation);
    }
    
    if(selectedIndex == index){
        selectedIndex = -1;
        return;
    }
        
    selectedIndex = index;
    var marker = markerList[index];
    var radius = marker.getRadius();
    
    if(radius == 10)
        selectedLocation = L.marker(marker.getLatLng(), {icon: pulsatingIcons[2]}).addTo(map);
    else if(radius == 5)
        selectedLocation = L.marker(marker.getLatLng(), {icon: pulsatingIcons[0]}).addTo(map);
    else
        selectedLocation = L.marker(marker.getLatLng(), {icon: pulsatingIcons[1]}).addTo(map);  
        
    if (map.getBounds().contains(marker.getLatLng()))
        return;
        
    map.setView(marker.getLatLng(), map.getZoom());    
} 