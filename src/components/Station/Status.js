import React from 'react'
const Status = (props) => {
    return props.enabled ? <p style={{ color: 'green' }}>ONLINE</p> : <p style={{ color: 'red' }}>OFFLINE</p>;
}

export default Status;
