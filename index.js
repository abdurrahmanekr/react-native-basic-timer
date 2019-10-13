import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

export default class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            second: 0,
        };

        this._mounted = false;
    }

    componentDidMount() {
        this._mounted = true;

        var self = this;
        this.interval = setInterval(() => {
            if (!self._mounted)
                return clearInterval(self.interval);

            self.state.second++;
            self.setState({
                second: self.state.second,
            });
        }, 1000);
    }

    componentWillUnmount() {
        this._mounted = false;
        clearInterval(this.interval);
    }

    zeroPrefix(number) {
        return number / 10 >= 1 ? number : ('0' + number);
    }

    render() {
        const hideHours = this.props.hideHours;
        const second = this.state.second;
        const hours = parseInt(second / 60 / 60);
        const minutes = parseInt(second / 60) % 60;
        const seconds = parseInt(second % 60);

        return (
            <Text
                {...this.props.textProps}>
                {!hideHours && (hours + ':')}
                {this.zeroPrefix(minutes) + ':'}
                {this.zeroPrefix(seconds)}
            </Text>
        );
    }
}