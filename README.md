# L.switchBasemap
An easy leaflet plugin to switch basemap

![image](https://user-images.githubusercontent.com/57905996/151420799-7781dae6-0692-4010-af5d-4b1c0eef3628.png)

Based and inspired on [Leaflet-IconLayers](https://github.com/ScanEx/Leaflet-IconLayers)

### [DEMO](https://elegant-meninsky-515912.netlify.app)

-----------------------------------------------------------------------------------
## Requirements

<ul>
  <li>Leaflet</li>
</ul>

## Install

### NPM

```
npm i leaflet-switch-basemap
```  

## Usage Example

An easy way to implement control to switch between basemaps

```javascript
new L.basemapsSwitcher([
  {
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map), //DEFAULT MAP
    icon: './assets/images/img1.PNG',
    name: 'Map one'
  },
  {
    layer: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',{
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }),
    icon: './assets/images/img2.PNG',
    name: 'Map two'
  },
  {
    layer: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }),
    icon: './assets/images/img3.PNG',
    name: 'Map three'
  },
], { position: 'topright' }).addTo(map);

```
L.switchBasemap receives two arguments:
<ul>
  <li>The first is an array of objects that contains basemap configs</li>
  <li>The second is an object with control options</li>
</ul>

### Basemap config

| Property | Type   | Required  | Description                         |
| ------------|--- | -------- | ----------------------------------------- |
| layer     | Leaflet layer | true     | A leaflet layer that can be used as basemap (example: L.tileLayer)            |
| icon | String |true| Path of the Image that will be display on the control |
| name | String  | true | Name of the layer |

### Options
| Option	  | Type | Default  | Description                       |
| ------------|--- | -------- | ----------------------------------------- |
| position	  |String | 'topright'    | Position of the control. Options: [leaflet control positions](https://docs.eegeo.com/eegeo.js/v0.1.665/docs/leaflet/L.Control/#control-positions) |


### Events

| Name	  | Description                       |
| ------------| ----------------------------------------- |
| basemapChange	  | Fired when user change basemap selection |

## Enhanced Support for LayerGroups

This fork adds support for using `L.LayerGroup` as a basemap, extending the `bringToBack()` method to LayerGroup objects. This is particularly useful when working with composite maps like vworld's Hybrid map (which combines satellite imagery with vector maps), where multiple layers need to be grouped together and handled as a single basemap.

### Example with LayerGroup

```javascript
// Create a layer group with multiple layers
const hybridLayerGroup = L.layerGroup([
  L.tileLayer('satellite-tile-url/{z}/{x}/{y}.png'),
  L.tileLayer('vector-overlay-url/{z}/{x}/{y}.png')
]);

// Use the layer group in the basemapsSwitcher
new L.basemapsSwitcher([
  {
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map),
    icon: './assets/images/osm.PNG',
    name: 'OpenStreetMap'
  },
  {
    layer: hybridLayerGroup,
    icon: './assets/images/hybrid.PNG',
    name: 'Hybrid Map'
  }
], { position: 'topright' }).addTo(map);
```

The addition of `bringToBack()` method to LayerGroup ensures that when switching between basemaps, layered maps are properly displayed behind other map elements.
