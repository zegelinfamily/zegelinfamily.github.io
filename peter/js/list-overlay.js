
// show destinations in table
function populateSidebarList(stops){
    var out = '<ul>'
    var index = 0;
    for(var i = 0; i < stops.length; i++){
        var stop = stops[i];
        if(stop.stop == 3)
            continue;

        out += '<li  id="' + index++ + '" class="listItem"><a>' + stop.title + '</a></li>'
    }
    out += '</ul>'

    document.getElementById('mainList').innerHTML = out;

    var lis = document.getElementById("mainList").getElementsByTagName('li');

    for (var i=0; i<lis.length; i++) {
        lis[i].addEventListener('click', listItemClicked, false);
    }

    function listItemClicked(){
        stopItemClicked(this.id);
    }
}

