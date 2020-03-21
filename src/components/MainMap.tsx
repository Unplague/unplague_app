import React from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet-css';
import './MainMap.css';
import continents from '../data/continents.json';

class MainMap extends React.Component<{regions:{name: string, population: number, infectionRate: number, reproductionRate: number, happiness: number}[]}, { lat: number, lng: number, zoom: number  }> {

    constructor(props?: any, context?: any) {
        super(props, context);
        this.updateMapSize = this.updateMapSize.bind(this);
        this.getColor = this.getColor.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.state = {
            lat: 45,
            lng: 0,
            zoom: 2
        }
    }

    updateMapSize(evt:any) {
        let zoomHeight = Math.log2(evt.newSize.y * 2 / 256)
        let zoomWidth = Math.log2(evt.newSize.x * 1.2 / 256)
        this.setState({zoom: Math.floor(Math.min(zoomWidth, zoomHeight))});
        console.log(this.state.zoom)
    }

    getColor(region: any) {
        console.log(region)
        if (!region || !region.infectionRate) return `green`
        let r=Math.round(region.infectionRate * 255)
        let g=Math.round(100 - region.infectionRate * 100)
        let b=Math.round(25 - region.infectionRate  * 25)
        return `rgb(${r},${g},${b})`
    }

    getStyle(feature: any) {
        return {
            fillColor:  this.getColor(this.props.regions.filter((region) => region.name === feature.properties.CONTINENT)[0]),
            weight: 1,
            opacity: 1,
            color: 'grey',
            fillOpacity: 0.8
        };
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
            attributionControl={false}
            >
        <GeoJSON data={continents as any} style={this.getStyle}></GeoJSON>
        </Map>);
  }
}

export default MainMap;
