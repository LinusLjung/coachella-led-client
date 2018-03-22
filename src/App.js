import React, { Component } from 'react';
import * as storage from './util/localstorage';

import './App.css';

import Controls from './components/Controls';

class App extends Component {
  componentWillMount() {
    this.setState({
      connected: false,
      host: storage.getValue('host') || '',
      media: {},
      screen: {
        overlay: {
        }
      }
    });
  }

  connectToHost = (ip) => {
    this.ws = new WebSocket('ws://' + ip + ':8080');

    this.ws.addEventListener('open', () => {
      this.ws.addEventListener('message', (e) => {
        const data = JSON.parse(e.data);

        console.log(data);

        switch (data.type) {
          case 'CONNECTED':
            this.sendMessage('GET_DATA');

            break;
          case 'DATA':
            this.setState({
              ...data.value,
              connected: true
            });
        }
      });

      this.sendMessage('CLIENT_TYPE', {
        type: 'client',
        id: this.getId()
      });

      this.setHost(ip);
    });
  };

  getId() {
    let id = storage.getValue('id');

    if (!id) {
      id = Math.ceil(Math.random() * 10000);
      storage.setValue('id', id);
    }

    return id;
  }

  setScreenProp(key, value) {
    this.setState({
      screen: {
        ...this.state.screen,
        [key]: value
      }
    });

    this.sendMessage('SET_' + key.toUpperCase(), value);
  }

  setScreenOverlayProp(key, value) {
    this.setState({
      screen: {
        ...this.state.screen,
        overlay: {
          ...this.state.screen.overlay,
          [key]: value
        }
      }
    });

    this.sendMessage('SET_OVERLAY_' + key.toUpperCase(), value);
  }

  setScreenWidth = (width) => {
    this.setScreenProp('width', width);
  };

  setScreenHeight = (height) => {
    this.setScreenProp('height', height);
  };

  setScreenCount = (count) => {
    this.setScreenProp('count', count);
  };

  setMedia = (media) => {
    this.setScreenProp('media', media);
  };

  setColor = (color) => {
    this.setScreenOverlayProp('color', color);
  };

  setOpacity = (opacity) => {
    this.setScreenOverlayProp('opacity', opacity);
  };

  setHost = (host) => {
    storage.setValue('host', host);

    this.setState({
      host
    });
  };

  sendMessage(type, value) {
    this.ws.send(JSON.stringify({
      type,
      value
    }));
  }

  render() {
    return (
      <div className='app'>
        <Controls
          connected={ this.state.connected }
          width={ this.state.screen.width }
          height={ this.state.screen.height }
          count={ this.state.screen.count }
          media={ this.state.media }
          selectedMedia={ this.state.screen.media }
          color={ this.state.screen.overlay.color }
          opacity={ this.state.screen.overlay.opacity }
          host={ this.state.host }
          setWidth={ this.setScreenWidth }
          setHeight={ this.setScreenHeight }
          setCount={ this.setScreenCount }
          setMedia={ this.setMedia }
          setColor={ this.setColor }
          setOpacity={ this.setOpacity }
          setHost={ this.connectToHost }
        />
      </div>
    );
  }
}

export default App;
