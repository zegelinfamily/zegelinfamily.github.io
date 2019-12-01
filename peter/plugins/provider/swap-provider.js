/*
 * L.Control.SwapProvider
 * A set of buttons to swap providers
 */
L.Control.SwapProvider = L.Control.extend(
{
    options: {
        position: 'topleft'
    },
    
    initialize: function (options) {
        L.setOptions(this, options);
    },
    
    
    onAdd: function(map)
    {
        document.ondragstart = function() { return false; };
        
        var container = L.DomUtil.create('div', 'leaflet-control-zoom' + ' leaflet-bar');
        
        this._map = map;
        
        providerButtons[0] = this._createButton('', 'Open Street Map', 'provider0',  container, this._provider0, this);
        providerButtons[1] = this._createButton('', 'Stamen Terrain', 'provider1',  container, this._provider1, this);
        providerButtons[2] = this._createButton('', 'Esri WorldImagery', 'provider2',  container, this._provider2, this);
        providerButtons[3] = this._createButton('', 'Stamen Watercolor', 'provider3',  container, this._provider3, this);
        
        //this._labelButton = this._createButton('', 'Show or hide labels','labelButton', container, this._provider3, this);
        
        providerButtons[currentProvider].innerHTML = '<div class="provider"></div>';
                
        return container;
    },
    
    _provider0: function(e){
        if(currentProvider == 0) 
            return;
            
        providerButtons[currentProvider].innerHTML = '';
        this._map.removeLayer(tileProviders[currentProvider]);
        currentProvider = 0;
        tileProviders[currentProvider].addTo(map);
        providerButtons[currentProvider].innerHTML = '<div class="provider"></div>';
    },
    
    _provider1: function(e){
        if(currentProvider == 1) 
            return;
            
        providerButtons[currentProvider].innerHTML = '';
        this._map.removeLayer(tileProviders[currentProvider]);
        currentProvider = 1;
        tileProviders[currentProvider].addTo(map);
        providerButtons[currentProvider].innerHTML = '<div class="provider"></div>';
    },
    
     _provider2: function(e){
        if(currentProvider == 2) 
            return;
            
        providerButtons[currentProvider].innerHTML = '';
        this._map.removeLayer(tileProviders[currentProvider]);
        currentProvider = 2;
        tileProviders[currentProvider].addTo(map);
        providerButtons[currentProvider].innerHTML = '<div class="provider"></div>';
    },
    
    _provider3: function(e){
        if(currentProvider == 3) 
            return;
            
        providerButtons[currentProvider].innerHTML = '';
        this._map.removeLayer(tileProviders[currentProvider]);
        currentProvider = 3;
        tileProviders[currentProvider].addTo(map);
        providerButtons[currentProvider].innerHTML = '<div class="provider"></div>';
    },
    
    _createButton: function( html, title, className, container, fn, context ){
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        //link.href = '#';
        link.title = title;
        
        var stop = L.DomEvent.stopPropagation;
        
        L.DomEvent
            .on(link, 'click', stop)
            .on(link, 'mousedown', stop)
            .on(link, 'dblclick', stop)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', fn, context);
        
        return link;
    }
});


L.control.swapProvider = function(options){
    return new L.Control.SwapProvider(options);
};