import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng, LeafletEvent, marker, icon } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent  implements OnInit, OnDestroy {


  onMapZoomEnd(e: LeafletEvent) {
    // Check if the event is a ZoomAnimEvent
    if ((e as ZoomAnimEvent).center) {
      // It's safe to cast the event to ZoomAnimEvent here
      const zoomEvent: ZoomAnimEvent = e as ZoomAnimEvent;

      // Now you can access properties like center, zoom, noUpdate
      this.zoom = zoomEvent.target.getZoom();
      this.zoom$.emit(this.zoom);
    }
  }

  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Input() options: MapOptions= {
                        layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                          opacity: 1,
                          maxZoom: 19,
                          detectRetina: true,
                          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        })],
                        zoom:8,
                        center: latLng(33.8869, 9.5375)    };
    public map!: Map;
    public zoom!: number;
  
    constructor() { 
    }
  
    ngOnInit() {
    }
  
    ngOnDestroy() {
      this.map.clearAllEventListeners;
      this.map.remove();
    };
    onMapReady(map: Map) {
     

      console.log('Map ready:', map);
      this.map = map;

      this.map$.emit(map);
     
    const tunisiaLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 1,
      maxZoom: 100, 
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    tunisiaLayer.addTo(map);
      const customIcon = icon({
        iconUrl: '../../assets/location.svg',  // Adjust the path to your custom icon image
        iconSize: [28, 48],  // Adjust the size of your custom icon
        iconAnchor: [16, 32],  // Adjust the anchor point if needed
        popupAnchor: [0, -32]  // Adjust the popup anchor if needed
      });
    const benArousMarker = marker([36.7528, 10.2079], { icon: customIcon }).addTo(map);
      benArousMarker.bindPopup('Place in Ben Arous');
      const tunisMarker = marker([36.8065, 10.1815], { icon: customIcon }).addTo(map);

      this.zoom = map.getZoom();
      this.zoom$.emit(this.zoom);
      
    }
    
 
  
}
