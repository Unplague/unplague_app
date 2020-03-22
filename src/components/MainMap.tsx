import React from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLngTuple, latLngBounds } from 'leaflet';
import 'leaflet-css';
import continents from '../data/continents.json';
import * as turf from '@turf/turf'
import { selectRegion } from "../actions";
import {store} from '../index';

class MainMap extends React.Component<{regions:{name: string, population: number, infectionRate: number, reproductionRate: number, happiness: number}[]}, { lat: number, lng: number, zoom: number, activeRegion: string  }> {

    constructor(props?: any, context?: any) {
        super(props, context);
        this.updateMapSize = this.updateMapSize.bind(this);
        this.getColor = this.getColor.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.selectRegion = this.selectRegion.bind(this);
        this.state = {
            lat: 45,
            lng: 0,
            zoom: 2,
            activeRegion: "None"
        }
    }

    updateMapSize(evt: any) {
        let zoomHeight = Math.log2(evt.newSize.y * 2 / 256)
        let zoomWidth = Math.log2(evt.newSize.x * 1.2 / 256)
        this.setState({zoom: Math.floor(Math.min(zoomWidth, zoomHeight))});
    }

    getColor(region: any) {
        if (!region || !region.infectionRate) return `green`
        let r=Math.round(region.infectionRate * 255)
        let g=Math.round(100 - region.infectionRate * 100)
        let b=Math.round(25 - region.infectionRate  * 25)
        return `rgb(${r},${g},${b})`
    }

    getStyle(feature: any) {
        return {
            fillColor: this.getColor(this.props.regions.filter((region) => region.name === feature.properties.CONTINENT)[0]),
            weight: feature.properties.CONTINENT === this.state.activeRegion ? 2 : 1,
            opacity: 1,
            color: feature.properties.CONTINENT === this.state.activeRegion ? `yellow` : `grey`,
            fillOpacity: 0.6
        };
    }

    selectRegion(evt:any) {
        let pt = turf.point([evt.latlng.lng, evt.latlng.lat]);
        let newActiveRegion = "None";
        for (let i = 0; i < continents.features.length; i++) {
            let poly = turf.multiPolygon(continents.features[i].geometry.coordinates);
            if (turf.booleanPointInPolygon(pt, poly)) newActiveRegion = continents.features[i].properties.CONTINENT;
        }
        
        if (newActiveRegion !== "None") {
            let regionId = this.props.regions.map(function(e, i) { return e.name; }).indexOf(newActiveRegion);
            store.dispatch(selectRegion(regionId));
        } else {
            store.dispatch(selectRegion(-1));
        }

        this.setState({activeRegion: newActiveRegion});
    }

    render() {
        //window.addEventListener('resize', this.updateMapSize);
        let position: LatLngTuple = [this.state.lat, this.state.lng];
        return (<Map
                center={position} 
                zoom={this.state.zoom}
                scrollWheelZoom={false}
                zoomControl={false}
                doubleClickZoom={false}
                touchZoom={false}
                dragging={false}
                animate={false}
                onresize={this.updateMapSize}
                attributionControl={false}
                onclick={this.selectRegion}
            >
            <GeoJSON 
                data={continents as any} 
                style={this.getStyle}
            />
        </Map>);
  }
}

export default MainMap;
