import React from 'react';
import { MapContainer, Marker,  GeoJSON, useMapEvents } from 'react-leaflet';
import { LatLngTuple, latLngBounds, icon } from 'leaflet';
import 'leaflet-css';
import continents from '../data/continents.json';
import * as turf from '@turf/turf'
import { selectRegion } from "../actions";
import {store} from '../index';

class MainMap extends React.Component<{regions:{name: string, population: number, infectionRate: number, infectionTrend: number, reproductionRate: number, happiness: number}[]}, { lat: number, lng: number, zoom: number, activeRegion: string }> {

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

    getSatisfactionIcon(region: any) {
        //fontawesome
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
        else if (region.happiness <= 0.3) {
            svg_string = angry_svg;            
        }
        else if (region.happiness <= 0.5) {
            svg_string = frown_svg;            
        }
        else if (region.happiness <= 0.8) {
            svg_string = meh_svg;            
        }
        else {
            svg_string = smile_svg;
        }
        let size = 8 * 2**this.state.zoom
        return icon({
            iconUrl: encodeURI("data:image/svg+xml," + svg_string).replace('#','%23'),
            iconSize: [size,size]
        })
    }

    getSatisfactionMarker(region: any) {
        let position: LatLngTuple
        let icon: any = undefined
        switch(region.name) {
            case "Asia":
                position = [55,96]
                break;
            case "Europe":
                position = [54,28]
                break;
            case "North America":
                position = [50,-109]
                break;
            case "South America":
                position = [-14,-64]
                break;
            case "Africa":
                position = [9.5,17]
                break;
            case "Australia":
                position = [-24,128]
                break;
            default:
                return
        }
        icon = this.getSatisfactionIcon(region)
        return {position: position, icon: icon}
    }

    getTrendIcon(region: any) {
        //fontawesome
        let trend1 = 'data:image/png;base64,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'
        let trend2 = 'data:image/png;base64,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'
        let trend3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAABCBSURBVHic7Zx7XFNXtsd3CElMQkjwARqBKqUBLSC0BQ3PBEHHmdr6oq0wxennaq+PeiskwKGKTe2IBFTm3s9nOvfa29FbGdQpVm1H7cuWR15ipVbkoUWrUAEdoCEvQl7n/qF0LOQk++QkBpTf5+M/nn32XmedfTbfrL32AmBSk8IjsVjMFIvFTG/b4ap8vG2AKxKLxYEsq/UCy2q9IBaLA71tjyuacI5HECTMz2ZrEiiV4RkNDU8xbbbvi4uLed62C6/I3jYAjxAEiaeaTA2rzpyZkXDpEjmku9snsL+fefXJJ3MXpqbWy+XyLm/bCKsJ43ikoGAJ3Wz+9A81NZyIGzdII/8/o7+fFHbr1pTWiIiXEgWCKw1y+TVv2gmrCeH4EpFoPcNkOrjhyBFWcE/PmOtsrRbM6+igNUdGvpCckqKtUyobvWDmo6Wd+fkl5Rs3atQsFooC4PCfhslE927YoHk7P78SAEBy2rkXNW6Ny8rKIkcFBx+c0d+/4rVjx1hThoeh7jNRqeDQmjW63qCgs7f1+pwDBw6YPWyqSxqXjheLxUw/i+Ufc7q6EnJOnWL4Wiy47reSyeDvy5cP/TB37iU9hbK0vLxc6yFTXda4W+OLi4unMc3mhgWtrTEvnz7NINtsuPvwQVEQ1d5OMVGpM+4EBWU9l5z8kUKh0HvAXJc1rhyPIEg4zWRqzGxoeCKzoYHm6HOUJSSYO2fPtoXevm33GUgAgCdv3fKlWizsrtDQV/lpaZ/IZLIBz1iOX+PG8YWFhQl0s7ku6/TpGc82N2PahZJI4NPMTKPi2Wd/+DE0tG/Q358VceMGBeslhXR3k2cMDPhdCwvLTUhN/UYul9/20CPg0rhwPFJQsIRhsXyyrqaGw3uA0UfLQiaD6pUrdW3h4QrA4Szu1+v/RxsUlHAjNJQbde0aFWtZCuzvJ4V1dk5pi4h4Zbywvtcd74zRR2SYMgUc+P3vtd1BQUcBh/OKRCIxNTY2WmtVqiPPZGayL8+bFxN19SqNarYPMZOs/4BgGb2fw0H3bN6sKRGJdmD1tUMkEu1+4w3t3alTJwTre2VgPIzexeWCgy+9pB2m0V4vlUqPOup3O4KspAwPH1pXU+M/pws7bDMeWP+hLzVisZgZ7Of32Zyursw/1NT4YS0NAADQwuOhf1u1SjNEpf6uTCo946zvBpmsnS8UftPM460JGBykzezrszuxyFYriG1tpfYGBoaZAwOXJaSm/l0ul5sIPBZuPVTH42F0WXy85R+Zmf8c8vVNLi8v/w52DJlMdpsvEHzUMXfuGjOFQn+ys9PuM3qb9R+a4xEECZtiMjUKlconltbVYTI6CgA4m55ulCUkdOjJ5EUVFRWdeMeSyWQ/x/H5h/45a9Yytb8/Gws3H2B9Tldo6LpEgeBTmUzWj3c8V/RQHD86jo7VzkImg+pVq3QtPJ4CcDjppaWlalfHVKlUQ9Hx8YdgcNMbcX2POx4rjj5a9nCR6Nh4cHOixvXtqkQkWr9761bNnWnTCOMiUcHiZl9AALpnyxbNTpFoq6ds8ahgGb2Ty0Xf2bZN81ZR0Suetmk7gqyU5OUN/hgS4nXWd3uneBi9hcdDa55/XjNEoTwvlUpl7rbFnoqLixdSjcbPVn72GXtBWxvm83ua9d26xo8w+lM3b2asc8LoruLiiLYXFKxNTUqKblAoruC5DxY3yVYriGtpod6dNm2uaeZMt7O+2xz/IKOvOXOG4YNBEO7AxR1icYGfwVBBNZtfSEpJsdUplXI890PjJoqC+deueYT13eJ4BEHCpgwPn8+sr5+TKZNhMrobcJEkycv7U8Dg4LZNVVWsRU1N1Kvh4QsXCoVzBb/5zena2loUtiNY3BxhfYbRyOmcM2cd302sT3iNv8/on68+c4YT097uEBc/WLtWO8DhHAVs9kaJRIJra0kikVBJanVNcE+P8NWPP/aj3F/GRkLFPwYHKwZJpBWVlZVDOB+BJNm2rYyt021aX13N8jMYMBu28njoR/f+Jv1WKpUqcI7zKxGa8bCMPsDhgPdyc7WD/v7lu/bvL8AzMwEAQCKRcNDBwdp5168vzD55kulrtf5yzQdFQXRbG/XngIBZ6unTVyUKhR/JZDJczq9Vqb6KFwpNTTExiZEdHVTmkP3b3cn6Lju+RCRazxwe/uD1qir/2b29mO26uFxwICdHa2AwXt9dUfEe3nEKCwu5FL1emdjU9NQLX35JJ6Fj3xkJADCvo4Pia7UGdHK52QvT0j6Wy+WDeMapVyqV/PT09qaoqGVzbt+mcTQau+3YWi2IunaNdiUi4vmk1FSdq3F9lxy/Mz+/hGUw7Np0+DBrmhp7mcYbXRytoqKip6eYzarf1tXNSj1/nuKsfWh3N9lfr2d1PPHEuqT09C8aGhqwZ4QdwUY3GUYjWNDaSrvC4yXzBYLAOqXyCzzjAIBzjcfD6LL4eMtXKSl9Q76+gvLy8qt4DUMQREA1mU5mnzzp72gZs6frc+agVStX6ow02pqysjLcTrkPC/WJ334bmNnQgPnCibA+9IyHZXQUAHAmPd0oJ4KLhYVr6Ebj0fVHj/rP7erCDQBT1WpS5PXrtJbIyBVJKSld9QrFZTz3w+ImEdaHcjwso7sjurhDLC5g6vX7N1VVsQL7+jDb6el0YKZQABUj2cnPYADRV6/SLkdGLnGF9aFx00XWdzqb7n92dZn19UGJFy9ifnZuwEUfMDj4Z87gYM6GI0dYDAyyAACA/oAA8H52thYAADZUV7Om/fwzZlsDnQ7eX7tWq2az/wbY7C147QI4cLMxNtZyNj29b5hGS9uzZ49D4nE443+Jo589G/icg1wXN+AilaRWfxzS0/Pieog92BFKMtNoNRejox1SCMViAc9dvkz7icuNVFOpaXF8/nGVSoUrJxAWN2f39kLH9TGdCcvoRHHREaOP1mhKgqUQd7A+LG7Csr5dx8MyOlFchGH0EWEF1WCDXu5gfdgXDcP6Y4yU5OeXsnS6kk2HD7OmDmLbJUtIMJ/OyOg1UqmJUqn0Ep4HAACe0WGCarAUAgBx1r//oo93hIWt9rVa6Vi5mwyjEcS0tdGuREQkJ6WlsWqVynMPXh9z+Mzq49Nr8/EBmNFFEgl8smSJ8Vxi4lUtiRRbVlbWgcdwAO4xOs1slmefOjU94bvvHO7BVq1erbsQEyMDbHb83r1772K1raysHOi3Whddnj//64NZWTozBfv31jPNzeTcEyemUoeG6hEEWYLX/rKysg4tiRR7Limp/dTSpQaUZP81+9hswObjQ7KRSHdGXxvz0PUKxflEoVB96emn0xa0tVFppn9h6UhAqj08XA44nIw9e/bg+lQBgGd0V/Zg8eyxEmV9pVJpiI6P/6suKCj+ekjIGNzUMxjgv3NzdTomc+euffv+BN3xzoKCTWWbN2s1fn4oCgCqp9PR/3rtNY0kL++ARCJx6ZhmSX6+uPSNN7R9AQEe34OF3WMdYLPRsntj7XZxKJJk2zZp5fr1Gi2DgaIAoDoGA63YuFG7UyTKw7oJ8zOvUyi+5ael6S9HRiYH9/bS/nftWp3G3//dd/bvL8aLi2Akjq7RbNt8+DCLrcU+oEGUkkYESyH04WHwTHMz7Wp4eKwrcX0A7uFmwuLF5qaoKH5oTw/tYFaWTsdk7nA0053+gNopEr1pIZPLST4+2bvLyo7jMQgA7Di6PXliDxZ2j9UNcX2wHUFWozZbta/VWrhr377/JGY5AOCtt94KcuU+iUTCeTsv78Kx5cv1Vh8fh598Q3y8+e38/J7CwsIIwgaPEoIgYZK8vJ++SEkxObLBSiKhx5ct07+dl/d9cXHxNFfGgvWVx7KFCwsLuQyTqZ7f1BS8pL6ehtVuBBcvLFhwQ0cmCx2RCxHl5eVNZaPouQWtrREvOv/NYDqXnNwzRKWmSqVS3EE+GHkkkwyW0d2ZsudMeFL6iLI+jNzu+PuM/mX2qVMBC9raMOmHaMqeWCxmJiYmUhUKBXQM/Fe4OX9+TFR7OyZuzrp71ye0t5feEh6es0gguCiTya7jsc+Z3LrU7CgsXEMbHv7ra8eOsRyFGgY4HHAgO1troNPL39237494x7lfNqUWAAC0ZLLAleVph0gkog8PSzZUV/vNGMA+DNg7Ywb4YO1a7TCVuvndvXur8I6DJbfN+JL8fDHDaKzcWFXFCnIQRyeKiwiChDEsFpVQqQwJv3lzmqvp1bC46WcwgOj2dlrzvHmZ/NRUv3ql8mu8NtuTOxwPzehEg2ruLpsCG/RyB+uPFiHHSyQSqjA29kRIT8+q9UePOt2DJZKy56myKbDRTYrFAp5tbqb9xOVGuBrXf1AuOx42ju6OPVhPl02BjW66I64/IpccDxtHdwcu/pJK8uGHftMdbPExh4ZAbEsL1dWUCzwpfUTj+iP94FJRUdHTNJPpm9/V1k51FNIlugfrxbIp0HusTdHR1lMZGWoLnZ5RWlqKa08C14yHZXSie7B4jmSOljuOUsLusRJhfWjHw8bRieLieCmbAoubrsb1oRwPy+huwMVxVTYFFjddYX1njodmdKK4OF7LpsDiJl7Wx3xAWEZ3By6O97IpsLj5AOtHqqnUVEesb9fxsIw+goutPJ4ccDiLXcHFiVI2ZQQ3dTNn2t1jHREs649xPCyjG+h0cCAnh9CBYFhGd0ZJtSrVV/Hp6U4phCjrNzY2Wr9RqY46i27CsP4Yxwv5/JORN27ErPj8cyqWAX0BAeC93FyX92CzsrLILy9d+n9B/f3/9u9VVQ5ZGZaSYCmEZjaD565coV0PDY2Kz8iI5cXEnLx48SIudKpVqb5amJ5uaYqK4s/r6KAyjEa77UK7u8k9M2cyBwIC4uoVig8fvDbG8UlpaWcHWayXKRaLX2h395jrXVwueD8nRzvEYLz+x4qKA3gMBuDRKZtSp1AoFi1e3O4od7MxLs5yPi6ud4hMXqZQKHS/smF0Y5lMZuALhdWds2ePcT5RXHzUyqY4etGNcXGWswJBj97XN6GiomLM5oRdo+w5n3B08REtm2LvRTtz+sjYmBKLxYFMq/U8986dWT2BgT9oyWThvn37sH9BYQj2SKaFTAZHVqzQ3QgJUQEO50WJRIK9+ENo69attOlk8vHg7u60V0+ccJhaQvQopUgkms6y2b6edffuUz2BgXd0ZHKCo50xhz+gFAqFPj45+YjO35+uQ9FX9u/fb/8vlgM9LmVTlEqlIY7PP6RnszlDJFKup7IloDRZNsULmiyb4liTZVMwNFk2xc2aLJtCABeJarJsigdT9pzJ22VTCDse9kimJ3CRqPCk9OE5SulxIQUFS97Jy1M7o4SHgYtEBYubt7hcdNebb2q2FxUtJzLeuC+b8rA0WTbFi5osm+JlPbZlU7ytx7JsyniRp8umOHU8LKOPR1wkKljcdDvrIwgSvzM/f+D7yEjbRMdFooLFzRYezybJz1cXFRUlOurP62VTJooeqbIpE02PRNmUiaoJXTZlomtClk15VES0bIrdz6ROofg2USBQX5o//xfnuyNl71ETVkqfnsEAf8nN1WnvOb0Sd8clYvF/SDdu1NwMDkZLt2zR7hSLCzxg/yOhkoICcemWLZqbwcGo9F6tmjcdtfd42ZTHSeOmbMrjqElfjXP9PyCzXUzz5pe/AAAAAElFTkSuQmCC'
        let base64 = ''
        let heightRatio = 1
        if (region.infectionTrend === 1) {
            heightRatio = 44/86
            base64 = trend1
        }
        if (region.infectionTrend === 2) {
            heightRatio = 67/86
            base64 = trend2
        }
        if (region.infectionTrend === 3) {
            base64 = trend3
        }
        
        let size = 6 * 2 ** this.state.zoom
        return icon({
            iconUrl: base64,
            iconSize: [size,size*heightRatio]
        })
    }

    getTrendMarker(region: any) {
        let position: LatLngTuple
        let icon: any = undefined
        switch(region.name) {
            case "Asia":
                position = [55,108]
                break;
            case "Europe":
                position = [54,40]
                break;
            case "North America":
                position = [50,-97]
                break;
            case "South America":
                position = [-14,-52]
                break;
            case "Africa":
                position = [9.5,29]
                break;
            case "Australia":
                position = [-24,140]
                break;
            default:
                return
        }

        icon = this.getTrendIcon(region)
        return {position: position, icon: icon}

    }

    render() {
        //window.addEventListener('resize', this.updateMapSize);
        let position: LatLngTuple = [this.state.lat, this.state.lng];
        return (<MapContainer
                center={position} 
                zoom={this.state.zoom}
                scrollWheelZoom={false}
                zoomControl={false}
                doubleClickZoom={false}
                touchZoom={false}
                dragging={false}
                attributionControl={false}
                style={{ height: '100%', width: '100%' }}
            >
            <MapEvents onMapClick={this.selectRegion} onResize={this.updateMapSize} />
            <GeoJSON 
                data={continents as any} 
                style={this.getStyle}
            />
            {this.props.regions.map((region, idx) => {
                    let marker: any = this.getSatisfactionMarker(region);
                    return <Marker key={`satisfaction-${idx}`} position={marker.position} icon={marker.icon}/>
                }
            )}
            {this.props.regions.map((region, idx) => {
                    if (!region.infectionTrend) return null;
                    let marker: any = this.getTrendMarker(region);
                    return <Marker key={`trend-${idx}`} position={marker.position} icon={marker.icon}/>
                }
            )}
        </MapContainer>);
  }
}

// Component to handle map events in react-leaflet v3
function MapEvents({ onMapClick, onResize }: { onMapClick: (evt: any) => void, onResize: (evt: any) => void }) {
    useMapEvents({
        click: onMapClick,
        resize: onResize,
    });
    return null;
}


export default MainMap;

