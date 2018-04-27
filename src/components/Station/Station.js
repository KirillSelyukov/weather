import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { getStationInitialData, mergeDelta, subscribeOnStationDelta, unsubscribeOnStationDelta } from '../../service/Points';
import Status from './Status';

class Station extends Component {
    state = {
        data: [],
        time: this.props.time,
        enabled: false
    }

    componentDidMount() {
        getStationInitialData(this.props.name)
            .then(({ points, enabled }) => {
                this.setState({ data: points, enabled: enabled });
            })

        this.subscriptionId = subscribeOnStationDelta(this.props.name, this.updateData.bind(this));
    }

    componentWillUnmount() {
        unsubscribeOnStationDelta(this.subscriptionId);
    }

    updateData({ delta, time, enabled }) {
        this.setState((prevState, props) => {
            return { data: mergeDelta(prevState.data, delta), time: time, enabled: enabled }
        });
    }

    getPoints = newPoints => {
        return newPoints.map(point => (
            { value: point }
        ));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data;
    }

    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <Status enabled={this.state.enabled} />
                {this.state.data === 0 ? <p>Loading...</p> :
                    <LineChart width={800} height={200} data={this.getPoints(this.state.data)}>
                        <XAxis />
                        <YAxis />
                        <Line type="monotone" stroke="#8884d8" dataKey='value' dot={false}
                         isAnimationActive={false}
                         />
                    </LineChart>
                }
            </div >
        )
    }
}

export default Station;
