var pulsatingIcons = [3];
var selectedLocation = null;

function addMapButtons(mapInfo){
          
    // add custom zoom bar with home and zoom rectangle    
    var zoom_bar = new L.Control.ZoomBar({position: 'topleft'}).addTo(map);
    
    // Add zoom and move history buttons 
    L.control.navbar().addTo(map);
    
    var swap_provider = new L.Control.SwapProvider({position: 'topleft'}).addTo(map);

    // Add a legend Control
    var legend = L.Control.extend({
        options: {position: 'bottomleft'},

        onAdd : function (map){ 
            var div = L.DomUtil.create('div', 'legend');
        
            disableClickPropagation(div);
            
            var innerHTML = '<svg class="shadow" height="69" width="287">'
                innerHTML += '<rect width="285" height="67" rx="8" ry="8" style="fill:rgb(255,255,255)" />'

                innerHTML += '<circle cx="18" cy="16" r="7" stroke="black" stroke-width="1.7" fill="#FF0000" />'
                innerHTML += '<circle cx="150" cy="16" r="7" stroke="black" stroke-width="1.7" fill="#FF7800" />'
                innerHTML += '<circle cx="220" cy="16" r="7" stroke="black" stroke-width="1.7" fill="#000000" />'

                innerHTML += '<line x1="10" y1="38" x2="45" y2="38" style="stroke:#000000;stroke-width:2" />'
                innerHTML += '<line x1="10" y1="52" x2="45" y2="52" style="stroke:#CD853F;stroke-width:2" />'
                innerHTML += '<line x1="90" y1="38" x2="125" y2="38" style="stroke:#FF0000;stroke-width:2" />'
                innerHTML += '<line x1="90" y1="52" x2="125" y2="52" style="stroke:#0000CD;stroke-width:2" />'
                innerHTML += '<line x1="175" y1="38" x2="210" y2="38" style="stroke:#FF5500;stroke-width:2" />'
                innerHTML += '<line x1="175" y1="52" x2="210" y2="52" style="stroke:#FF00FF;stroke-width:2" />'

                innerHTML += '<text x="30" y="20" class="legend-text">Stayed a Few Days</text>'
                innerHTML += '<text x="161" y="20" class="legend-text">Visited</text>'
                innerHTML += '<text x="232" y="20" class="legend-text">Waypoint</text>'

                innerHTML += '<text x="51" y="41" class="legend-text">Car</text>'
                innerHTML += '<text x="51" y="55" class="legend-text">Bus</text>'
                innerHTML += '<text x="131" y="41" class="legend-text">Plane</text>'
                innerHTML += '<text x="131" y="55" class="legend-text">Train</text>'
                innerHTML += '<text x="216" y="41" class="legend-text">Ferry or Ship</text>'
                innerHTML += '<text x="216" y="55" class="legend-text">Campervan</text>'

                innerHTML += '</svg>'

            div.innerHTML = innerHTML;
            return div;    
        },                            
    });
    
    map.addControl(new legend());


   // create pulsating markers
    const generatePulsatingMarker = function (radius, margin, color) {
        const cssStyle = `margin-left:-${margin}px;
        margin-top:-${margin}px;
        width: ${radius}px;
        height: ${radius}px;
        background: none;
        color: ${color};`
        return L.divIcon({html: `<span style="${cssStyle}" class="pulse"/>`,className: 'pulsatingIcon'})
    }

    pulsatingIcons[0] = generatePulsatingMarker(16,2,'red');
    pulsatingIcons[1] = generatePulsatingMarker(14,1,'red');
    pulsatingIcons[2] = generatePulsatingMarker(26,7,'red');        
}

// prevent clicks from passing through to map
function disableClickPropagation(div){
    if(!L.Browser.touch){
        L.DomEvent
            .disableClickPropagation(div)
            .disableScrollPropagation(div);
    }else{
        L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);
    }
}
