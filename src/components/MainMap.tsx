import React from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet-css';
import './MainMap.css';
import continents from '../data/continents.json';

class MainMap extends React.Component<{}, { lat: number, lng: number, zoom: number  }> {

    constructor(props?: any, context?: any) {
        super(props, context);
        this.updateMapSize = this.updateMapSize.bind(this);
        this.state = {
            lat: 0,
            lng: 0,
            zoom: 2
        }
    }

    updateMapSize(evt:any) {
        let zoomHeight = Math.log2(evt.newSize.y * 1.6 / 256)
        let zoomWidth = Math.log2(evt.newSize.x * 1.1 / 256)
        this.setState({zoom: Math.floor(Math.min(zoomWidth*1.1, zoomHeight))});
        console.log(this.state.zoom)
    }

    render() {
        //window.addEventListener('resize', this.updateMapSize);
        let position: LatLngTuple = [this.state.lat, this.state.lng];
        return (<Map
            center={position} 
            zoom={this.state.zoom}
            scrollWheelZoom={false}
            zoomControl={false}
            dragging={false}
            animate={false}
            onresize={this.updateMapSize.bind(this)}
            >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
            noWrap={true} 
            />
        <GeoJSON data={continents as any}></GeoJSON>
        </Map>);
  }
}

export default MainMap;
