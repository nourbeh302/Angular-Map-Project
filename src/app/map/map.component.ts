import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  properties = [
    { address: "Helipolis", lat: 30.0910, long: 31.3241 },
    { address: "Helwan", lat: 29.8747, long: 31.3345 }
  ]

  API_KEY = "02c09469ce51f8291acd700af8cabecb"

  private map: any;

  // http://api.positionstack.com/v1/forward?access_key=02c09469ce51f8291acd700af8cabecb&query=20 Awad Fahmy St., Cairo

  constructor(private router: Router) { }

  ngAfterViewInit(): void { this.initMap(); }

  private initMap(): void {
    /* 
    Mapper: address => longitude & latitude
    List Properties go here.
    Each property should contain longitude & latitude.
    These longitude & latitude are transformed into marker which will be displayed on the map
     */

    const ZOOM = 12
    const ICON_SIZE = [24, 30] as L.PointExpression
    const ICON_ANCHOR = [12, 15] as L.PointExpression
    const DEFAULT_VIEW = [30.10093501241242, 31.308952111] as L.LatLngExpression
    const TILES_URL = "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png";

    this.map = L.map("map");
    this.map.setView(DEFAULT_VIEW, ZOOM);

    // Create tiles
    var tiles = L.tileLayer(TILES_URL, {
      maxZoom: 19,
      minZoom: 3
    })

    // Create marker
    var markerIcon: L.Icon<L.IconOptions> = new L.Icon({
      iconUrl: "../../assets/marker.svg",
      iconSize: ICON_SIZE,
      iconAnchor: ICON_ANCHOR,
    })

    // Add circle range at my home
    L.circle(DEFAULT_VIEW, {
      color: '#0000',
      fillColor: '#3284ff',
      fillOpacity: 0.2,
      radius: 200
    }).addTo(this.map);

    // Add each property long and lat to the map as markers
    this.properties.forEach(p =>
      L.marker(
        [p.lat, p.long] as L.LatLngExpression,
        { icon: markerIcon }
      ).addTo(this.map)
    )

    // Add default long and lat to the map as marker
    var myHomeMarker = L.marker(DEFAULT_VIEW, { icon: markerIcon })
    myHomeMarker.addTo(this.map)

    // Do something when I click on the default marker
    myHomeMarker.addEventListener("click", () => {
      // var newLatLng = [29.8747, 31.3345]
      // this.map.setView(newLatLng, ZOOM)
      this.router.navigate(["/property", 3])
    })

    // Add tiles to the map
    tiles.addTo(this.map);
  }
}



