# L.switchBasemap

This repository is a fork of <https://github.com/clavijojuan/L.switchBasemap>.

## Enhanced Support for LayerGroups

This fork adds support for using `L.LayerGroup` as a basemap, extending the `bringToBack()` method to LayerGroup objects. This is particularly useful when working with composite maps like vworld's Hybrid map (which combines satellite imagery with vector maps), where multiple layers need to be grouped together and handled as a single basemap.

![image](https://github.com/user-attachments/assets/d4abb45a-29f0-4c2e-869c-1f05b3aee689)


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
