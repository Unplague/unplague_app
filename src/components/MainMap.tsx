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
        let unhappy_icon = icon({
            iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEgklEQVR4nO2bT2jURxTHP9kkBhJPTc0lp/XipRTUQ2NBDPVfD8Z7S1YQmjYelFK86MGLf/KHgmi8qadGKVUw9zaCoJ6LFLoloV56kLRRhEKiLayHmZWQvPnz+83M/naz+cKDsHl/N5l5b968gS1soZHoAAaAvcAwcFzTsP5sQPNsGvQCR4Fp4AnwEqg56KXmnQaOaB0thRJwELgDrOAO2EUrwKzWWWpgHJnRBZwA/iA8aBNVgYq21VQYARZJF/h6WtQ2C8cgMEfjAl9Pc9qHQrAPeOFwsE4LwE1gHLWWy0Afak2X9M9l/btxzbvgqfsFMJQ41g2oAG8cjlWBc6jA8qKsdVQdtla1T8nRCUw6nHkOjGremHZHtW6b7UkSZopO4J7F+BJwGtiWygGgR9tYsvjxE3G//Pew/eXngf4URg3oBx5a/JmIbbBiMXYd6I5t0APdwIzFr9FYhoaQN7z/gLFYRgIwhvJF2hiDs8Mg5lT3VajyiBjDnCKD6gRTkXM9RGkimJbDg7wKRwwK5ylmzbvQjXljPJZVWRdybb+E/26/DTiMOtL2ZHUgp3w/copcJOMB6oSgpIbKwb6OPFsj9xvwYQb7IfJnkH33rhRLyEfa5/gXOZcE+Sy5OUS+B7lirOJZJR4UhLPm1buC/I8NlDfVLZ/5CN8RBKtkKy9PCjqypM1Q+U7kA9SsS7AXuY11LoNxUP9qF4HXmi6T7ZASKg9wno1xrODoMR4VhGqEHWmLwk7kWI7YhKYFgYWkbqaFlMqnbAJPBIGbaX1MiltsjOexibkDuW8/ntzNdDjFxniWMVy+DAjMNVRabFUcQo5ph8S818DcihtgHWXkmPZIzMMG5r4GOJoKfcgxHZCYjxuYm/o6yoESckzipUrbfwHDBua2WQJtvwm2fRpMVQh1o77xceA28BT4HdWwXEUdUP4CfgV+RpWqx4APAu1CxkII4pbCHwHX8JsKMdEj4AvytdQgYykMcQ5Du4BfBD0h9DfwHdmbsZkPQyHH4S7UGXzVI6C89Az41MMXyHkcDmmIXI0YqI3eArs9/MnVEIH8LbF/HY6/QvXtrwJngW+AL1G9xtPABVQv8E+HnprWYUPulhjkb4r+Y5C7D3xOtp5iGbiC+Rp80iEf1BTN2xY/u45/AdjvY9CC7cD3wP9r9L5CrW8TgtvikO9ipANVY88A32rnY+FjVIa6hHtDDr4YgThXY0Ug2tUYtPnlaB1tfT0O9gGJZpgOqeNrZB+DByRAjZlI1V0rjMh8EsuIbUhqhuKGpG5Y/Io2JFWHbUzuIZt8TA78BiXPkP/o6oMebcM1KJl0WnTCYrxeMVaIPypbwT0qO0GDmri+w9LnsZetLuzUOnyGpaOveReG8B+XX0R1Z06h+nSmcflDmucW/g8wChmXr2MQVWj4OJqCHlDgg4m1KOLJTO7yNhW6UHuDa72GUBW11pvu0dRalFCNh1niPZv7QetsuWu6XlQTcgrVjl7GHfCy5p1CTYq23MNJGzpQtzJ7UPdzI5oO6M92sMmezm6h2fEOauAYR1KS/VUAAAAASUVORK5CYII=",
            iconSize: [32,32]
        })
        let happy_icon = icon({
            iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEu0lEQVR4nO2by2/UVRTHPzNtmaSzIpW66GqQlYkuYGFNTGigwsbyF3RITKgpC4m6g22V0i5BFgRWWqrRBSwMrGAFKyIJxMWYNmGnpMlQXBXROC7uGVPb+/rdxzzafpOTNL+e58zce8895/xgD3voJErAKHAEmABOCU3Is1Hh2TEYBk4Ci8BD4AXQctAL4V0EToiOvkIZOA7cBDZwB+yiDWBJdJY7GEdhDAKngV+JD9pEDaAutnoKU8Aq+QLfSqtis+sYA27TucC30m3xoSt4H3jucLBNK8B1YBa1lmtAFbWmy/J3Tf43K7wrnrqfA+OZY92GOvCnw7EGcB4VWChqoqPhsPVKfMqOAeCSw5lnwLTwprQ7Lbptti+R8aQYAH60GF8DPgX25XIAqIiNNYsfP5D2w/8Ptm/+HjCSw6gBI8B9iz/zqQ3WLcYuA0OpDXpgCLhi8Ws6laFx9BveX8BMKiMRmEH5otsYo0+HMcxH3ZlY5Qkxg/mIjMoTTEnO5RilmWBaDrdCFU4ZFN6jO2vehSHMG+NHRZUNos/t1/Df7fcBH6KutJWiDgTKj6A/IlcpeIE6rVHSQp3Bvo483ST3C/BGAfsx8ufQ++6dKZbRX2mf4Z/kfKmRL3I2x8hX0GeMDTyzxOMa4aLn6rJG/vsOypvylmM+wjc1gg2KpZcfa3QUOTZj5QfQX6CWXILD6MtY5wsYB/VTmwP+EPqKYpeUWHmAC2yPYwNHjfGkRqhF3JW2WziIPpYTNqFFjcBKVjfzQneUL9gEHmoEruf1MStusD2eBybmEvq6/Wx2N/PhLNvjaWJovoxqmFuoY7FfMYk+pgM65iMG5n7cANuooY/psI55wsBc7YCjuVBFH9NRHfMpA3NPt6McKKOPSdtU2fUfwISBedcsgV2/CYYegyXU5WUZdY3NWR4fERvLYtM1TFHoGAxNhOa28D8lz7Kp8v8iSUts21AoEYKwVPilRmbZZiQAJeA7jZ2XDrlCqTCEXYZ0H0AL+MwhVwSfG2ysO+QKX4ZCrsMXDTJ/i+Mxx2gZ+EJ06WxctMgGXYdDCiIV4LHBWAu4g9pgi+JN4K5F78/Ya5RBBREIK4kdAn63OLuOaqa84zIOvCu86xZ9vwFvWXQEl8QgvCj6Nva2dZseA9+gdvAzQnPyzPZLatOa2LIhqigaUxavAU88ggilJ7gTs+iyOMQ1RqrAtYDgXHQNv/wiujECaVpjHwCPDM4UoUeiywfJWmOQpjlaQvX3fgJeG/Tp6LXITOKfUCVtjraRsj2+H7WRXkV9q03gH6GmPLsqPPsD9Cdvj4N9QKIXpkPa+AS9j9EDEqDGTF5plPfDiMx7qYzYhqSu0L0hqa8tfiUbkmrDNiZ3nx0+Jgd+g5LnCJsG8UVFbLgGJbNOi85bjLdQWVid9KOyddyjsvN0qIjrOyx9AXUtDcVB0eEzLJ18zbswjv+4/CqqOnMWldyYxuUnhecG/i9gdGVcvo0xVKLhm+Glplt08YWJzejGKzPB6W0uDKL2Btd6jaEGaq333EtTm1FGFR6WSPfa3Leis+/adMOoIuQCqhzdxB1wU3gXUDfJvntx0oYSqitzGNWfmxI6Ks8OsMNend1Dr+NflNNDIIcoGNEAAAAASUVORK5CYII=",
            iconSize: [32,32]
        })
        if (region.happiness > 0.5) return happy_icon
        else return unhappy_icon
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
