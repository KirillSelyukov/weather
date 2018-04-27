import React from 'react';

const filter = (props) => {
    return (
        <div>
            <button onClick={props.sort}>Sort by names</button>
        </div>
    );
}

export default filter