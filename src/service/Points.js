
import axios from 'axios';
let state;
let lastCallTime = null;

initialize();

function initialize() {
    state = axios.get('http://localhost:3333/api/v1/init').catch((e) => 'Error on initialize');
}

function getDelta(name) {
    return state.then(({ data }) => {
        const time = lastCallTime == null ? data.time : lastCallTime;
        const delta = axios.get(`http://localhost:3333/api/v1/client/${data.clientKey}/delta/${name}/since/${time}`);
        return delta;
    });
}

function trackError(error) {
    console.log('some error during  delta recieving')
}

export function mergeDelta(points, delta) {
    return [...points, ...delta].slice(delta.length);
}

export function subscribeOnStationDelta(name, callback) {
    return setInterval(() => {
        getDelta(name)
            .then(resp => {
                if (!resp) {
                    console.log('ingetDelta:there is no resp')
                }
                if (!resp.data.error) {
                    lastCallTime = resp.data.time;
                    callback(resp.data);
                }
            }, trackError);
    }, 100);
}

export function unsubscribeOnStationDelta(number) {
    clearInterval(number);
}

export function getStations() {
    return state.then(({ data }) => {
        return Object.keys(data.stations);
    });
}

export function getStationInitialData(name) {
    return state.then(({ data }) => {
        return { points: data.stations[name].points, enabled: data.stations[name].enabled };
    });
}
