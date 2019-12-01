let scrollX = 0;
let scrollY = 0;

// called when 'main page' is clicked when showing a map
function hideOverlay(){
    var overlay = document.getElementById('overlay');
    overlay.style.visibility = "hidden";
    overlay.style.opacity = "0";
    overlay.style.transition= "visibility 0s .2s, opacity .2s linear";
    document.getElementById('page-title').innerHTML = "Our Travels";

    // reshow background and enable scrolling
    document.getElementById('container').style.display = 'block';
    window.scrollTo(scrollX, scrollY);
}

// called when trip image is clicked on index page
function showOverlay(tripName){
    var overlay = document.getElementById('overlay');
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlay.style.transition = "opacity .4s linear";

    // prevent scrolling of background
    scrollX = window.pageXOffset;
    scrollY = window.pageYOffset;
    document.getElementById('container').style.display = 'none';

    loadMapAndData(tripName);
}

// called when main page is loaded with a parameter indicating a particular trip - ie from external link
function showOverlayImmediately(tripName){
    var overlay = document.getElementById('overlay');
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlay.style.transition = "opacity 0.8s 1s linear";

    // prevent scrolling of background
    scrollX = window.pageXOffset;
    scrollY = window.pageYOffset;
    document.getElementById('container').style.display = 'none';

    loadMapAndData(tripName);
}

// get the .json file for a trip. This contains info such as title, the initial map location and a list of stops and image thumbnails
function loadMapAndData(tripName){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var trip = JSON.parse(xmlhttp.responseText);
            showMapTitleAndBlurb(trip.mapInfo);     // overlay.js
            showThumbnails(tripName,trip.mapInfo.images);// overlay.js
            initOpenStreetMaps(trip);               // map-overlay.js
            populateSidebarList(trip.stops);        // list-overlay.js 
            addMapButtons(trip.mapInfo);            // map-buttons.js
        }
    };

    var url ='trips/' + tripName +  '/' + tripName + '.json'
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// show the map page title and info
function showMapTitleAndBlurb(mapInfo){
    document.title = mapInfo.title;
    document.getElementById('map-title').innerHTML = mapInfo.title;
    document.getElementById('map-blurb').innerHTML = mapInfo.blurb;
  
}

// show the thumbnails for a trip, if there are any
function showThumbnails(tripName,images){
    var imageFolder ='tri/' + tripName +  '/Images/'
    
    if(images == null){
        document.getElementById("scrolling-thumbnails").style.display = 'none';
        return;
    }

    document.getElementById("scrolling-thumbnails").style.display = 'flex';
    var out = "";
    for(var i = 0; i < images.length; i++){
        var image = images[i];
        out += '<img class="thumbnail" src="'+ imageFolder + image + '">';
        }
    document.getElementById("scrolling-thumbnails").innerHTML = out;
}
