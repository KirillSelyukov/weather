import React from 'react';
import Station from '../Station/Station';

export default function Stations({ names }) {
    return names.map(name => <Station key={name} name={name} />)
}
