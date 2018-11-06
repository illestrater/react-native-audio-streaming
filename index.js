import React, { Component } from 'react';
import {
    NativeModules,
    NativeAppEventEmitter,
    DeviceEventEmitter,
    ActivityIndicator,
    Platform,
} from 'react-native';

import EventEmitter from 'eventemitter3';

const { ReactNativeAudioStreaming } = NativeModules;

// Possibles states
const PLAYING = 'PLAYING';
const STREAMING = 'STREAMING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING'; // Android only
const BUFFERING_START = 'BUFFERING_START'; // Android only

// UI
const iconSize = 60;

class Listener extends EventEmitter {
    constructor(props) {
        super(props);

        DeviceEventEmitter.addListener(
            'AudioBridgeEvent', (evt) => {
                if (evt.status === PLAYING || evt.status === STOPPED || evt.status === ERROR) {
                    this.emit(evt.status, evt);
                }
            }
        );
    }
}

export { Listener, ReactNativeAudioStreaming }
