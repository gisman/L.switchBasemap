L.Control.basemapsSwitcher = L.Control.extend({
    options: {
        position: 'topright',
    },

    initialize: function(layers, options){
        L.Util.setOptions(this, options);
        this.layers = layers
    },

    onAdd: function (map){
        const container = this.container = L.DomUtil.create('div', 'leaflet-control-basemapsSwitcher');

        this._createItems();
        this._collapse();

        container.addEventListener('mouseover', () => {
            this._expand();
        })

        container.addEventListener('mouseout', () => {
            this._collapse();
        })

        return container;
    },

    _createItems() {
        this.layers.forEach( (obj, index) => {

            obj.id = index

            const imgContainer = L.DomUtil.create('div', 'basemapImg');
            const img = L.DomUtil.create('div');
            const name = L.DomUtil.create('div', 'name');
            const check = L.DomUtil.create('div', 'check');
            name.innerHTML = obj.name

            if(obj.layer?._map){
                this.activeMap = obj
                check.classList.add('activeMap');
            }
            
            img.style.backgroundImage = `url(${obj.icon})`;
            imgContainer.append(img)
            img.append(check)
            img.append(name)
            
            imgContainer.addEventListener('click', () =>{

                this._removeLayers(obj.layer);
                
                if(!obj.layer?._map){
                    obj.layer.addTo(this._map);
                    obj.layer.bringToBack()
                    this.activeMap = obj;
                    this._collapse();
                    this._map.fire('basemapChange', { layer : obj.layer });

                    check.classList.add('activeMap');
                }

            })

            this.container.append(imgContainer)

        })
    },

    _removeLayers(layer){

        this.layers.forEach( (obj) =>{
            if(obj.layer._leaflet_id !== layer._leaflet_id && obj.layer?._map) {
                this._map.removeLayer(obj.layer);
            }
        })
    },

    _collapse(){

        this.container.childNodes.forEach( (child, index) => {

            if(index !== this.activeMap.id){
                child.classList.add('hidden')
                let check = child.querySelector('.check')
                check.classList.remove('activeMap')
            }
        })

    },

    _expand(){

        this.container.childNodes.forEach( (child) => {
            child.classList.remove('hidden')
        })
    }

})

L.basemapsSwitcher = function(layers, options){
    return new L.Control.basemapsSwitcher(layers, options);  
}

// Add bringToBack method to L.LayerGroup
// vworld의 Hybrid map(위성영상과 벡터지도를 결합하여 제공하는 지도)은 두 개의 basemap을 분리하여 제공하는데, 이때 두 개의 basemap을 LayerGroup으로 묶어서 L.basemapsSwitcher에 넣어줘야 함
// LayerGroup은 bringToBack 메서드를 지원하지 않기 때문에, L.LayerGroup.prototype.bringToBack을 추가하여 사용해야 함
// 2025.05.21 gisman
L.LayerGroup.prototype.bringToBack = function() {
    this.eachLayer(function(layer) {
        if (layer.bringToBack) {
            layer.bringToBack();
        }
    });
    return this;
};
