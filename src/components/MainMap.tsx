import React from 'react';
import { Map, Marker,  GeoJSON, LatLngBounds } from 'react-leaflet';
import { LatLngTuple, latLngBounds, icon } from 'leaflet';
import 'leaflet-css';
import continents from '../data/continents.json';
import * as turf from '@turf/turf'
import { selectRegion } from "../actions";
import {store} from '../index';

class MainMap extends React.Component<{regions:{name: string, population: number, infectionRate: number, reproductionRate: number, happiness: number}[]}, { lat: number, lng: number, zoom: number, activeRegion: string }> {

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

    getIconOpacity(props: any): number {
        return 0.5
    }

    getIcon(region: any) {
        //favicons
        let dead_svg = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="dizzy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-dizzy fa-w-16 fa-fw fa-2x"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-33.8-217.9c7.8-7.8 7.8-20.5 0-28.3L196.3 192l17.9-17.9c7.8-7.8 7.8-20.5 0-28.3-7.8-7.8-20.5-7.8-28.3 0L168 163.7l-17.8-17.8c-7.8-7.8-20.5-7.8-28.3 0-7.8 7.8-7.8 20.5 0 28.3l17.9 17.9-17.9 17.9c-7.8 7.8-7.8 20.5 0 28.3 7.8 7.8 20.5 7.8 28.3 0l17.8-17.8 17.8 17.8c7.9 7.7 20.5 7.7 28.4-.2zm160-92.2c-7.8-7.8-20.5-7.8-28.3 0L328 163.7l-17.8-17.8c-7.8-7.8-20.5-7.8-28.3 0-7.8 7.8-7.8 20.5 0 28.3l17.9 17.9-17.9 17.9c-7.8 7.8-7.8 20.5 0 28.3 7.8 7.8 20.5 7.8 28.3 0l17.8-17.8 17.8 17.8c7.8 7.8 20.5 7.8 28.3 0 7.8-7.8 7.8-20.5 0-28.3l-17.8-18 17.9-17.9c7.7-7.8 7.7-20.4 0-28.2zM248 272c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64z" class=""></path></svg>'
        let angry_svg = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="angry" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-angry fa-w-16 fa-fw fa-2x"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm0-144c-33.6 0-65.2 14.8-86.8 40.6-8.5 10.2-7.1 25.3 3.1 33.8s25.3 7.2 33.8-3c24.8-29.7 75-29.7 99.8 0 8.1 9.7 23.2 11.9 33.8 3 10.2-8.5 11.5-23.6 3.1-33.8-21.6-25.8-53.2-40.6-86.8-40.6zm-48-72c10.3 0 19.9-6.7 23-17.1 3.8-12.7-3.4-26.1-16.1-29.9l-80-24c-12.8-3.9-26.1 3.4-29.9 16.1-3.8 12.7 3.4 26.1 16.1 29.9l28.2 8.5c-3.1 4.9-5.3 10.4-5.3 16.6 0 17.7 14.3 32 32 32s32-14.4 32-32.1zm199-54.9c-3.8-12.7-17.1-19.9-29.9-16.1l-80 24c-12.7 3.8-19.9 17.2-16.1 29.9 3.1 10.4 12.7 17.1 23 17.1 0 17.7 14.3 32 32 32s32-14.3 32-32c0-6.2-2.2-11.7-5.3-16.6l28.2-8.5c12.7-3.7 19.9-17.1 16.1-29.8z" class=""></path></svg>'
        let frown_svg = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="sad-tear" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-sad-tear fa-w-16 fa-fw fa-2x"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm8-152c-13.2 0-24 10.8-24 24s10.8 24 24 24c23.8 0 46.3 10.5 61.6 28.8 8.1 9.8 23.2 11.9 33.8 3.1 10.2-8.5 11.6-23.6 3.1-33.8C330 320.8 294.1 304 256 304zm-88-64c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-165.6 98.8C151 290.1 126 325.4 126 342.9c0 22.7 18.8 41.1 42 41.1s42-18.4 42-41.1c0-17.5-25-52.8-36.4-68.1-2.8-3.7-8.4-3.7-11.2 0z" class=""></path></svg>'
        let meh_svg = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="meh" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-meh fa-w-16 fa-fw fa-2x"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z" class=""></path></svg>'
        let smile_svg = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="smile" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-smile fa-w-16 fa-fw fa-2x"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z" class=""></path></svg>'
        let grin_alt_svg = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="grin-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-grin-alt fa-w-16 fa-fw fa-2x"><path fill="currentColor" d="M200.3 248c12.4-18.7 15.1-37.3 15.7-56-.5-18.7-3.3-37.3-15.7-56-8-12-25.1-11.4-32.7 0-12.4 18.7-15.1 37.3-15.7 56 .5 18.7 3.3 37.3 15.7 56 8.1 12 25.2 11.4 32.7 0zm128 0c12.4-18.7 15.1-37.3 15.7-56-.5-18.7-3.3-37.3-15.7-56-8-12-25.1-11.4-32.7 0-12.4 18.7-15.1 37.3-15.7 56 .5 18.7 3.3 37.3 15.7 56 8.1 12 25.2 11.4 32.7 0zM248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.9-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3z" class=""></path></svg>'
        let svg_string = '';
        if (region.infectionRate >= 1) {
            svg_string = dead_svg;
        }
        else if (region.happiness <= 0.2) {
            svg_string = angry_svg;            
        }
        else if (region.happiness <= 0.4) {
            svg_string = frown_svg;            
        }
        else if (region.happiness <= 0.6) {
            svg_string = meh_svg;            
        }
        else if (region.happiness <= 0.8) {
            svg_string = smile_svg;
        } 
        else {
            svg_string = grin_alt_svg;            
        }
        return icon({
            iconUrl: encodeURI("data:image/svg+xml," + svg_string).replace('#','%23'),
            iconSize: [32,32]
        })
    }

    getMarker(region: any) {
        let position: LatLngTuple
        let icon: any = undefined
        switch(region.name) {
            case "Asia":
                position = [55,100]
                break;
            case "Europe":
                position = [54,32]
                break;
            case "North America":
                position = [50,-105]
                break;
            case "South America":
                position = [-14,-60]
                break;
            case "Africa":
                position = [9.5,21]
                break;
            case "Australia":
                position = [-24,135]
                break;
            default:
                return
        }

        icon = this.getIcon(region)
        return {position: position, icon: icon}

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
            {this.props.regions.map((region) => {
                    let marker: any = this.getMarker(region);
                    return<Marker position={marker.position} icon={marker.icon}/>
                }
            )}
        </Map>);
  }
}

export default MainMap;
