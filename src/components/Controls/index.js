import React, { Component } from 'react';
import './css.css';
import path from 'path';

class Controls extends Component {
  static defaultProps = {
    media: {}
  };

  componentWillMount() {
    this.setState({
      host: this.props.host
    });
  }

  handleWidthChange = e => {
    const value = e.currentTarget.value;

    if (!value) {
      return;
    }

    this.props.setWidth(Number(value));
  };

  handleHeightChange = e => {
    const value = e.currentTarget.value;

    if (!value) {
      return;
    }

    this.props.setHeight(Number(value));
  };

  handleCountChange = e => {
    const value = e.currentTarget.value;

    if (!value) {
      return;
    }

    this.props.setCount(Number(value));
  };

  handleMediaChange = e => {
    const value = e.currentTarget.value;

    if (!value) {
      return;
    }

    this.props.setMedia(value);
  };

  handleColorChange = e => {
    const value = e.currentTarget.value;

    if (!value) {
      return;
    }

    this.props.setColor(value);
  };

  handleOpacityChange = e => {
    const value = e.currentTarget.value;

    console.log(e, value);

    if (!value) {
      return;
    }

    this.props.setOpacity(value);
  };

  handleHostSubmit = (e) => {
    e.preventDefault();

    this.props.setHost(e.target.host.value);
  };

  handleHostChange = (e) => {
    this.setState({
      host: e.target.value
    });
  }

  render() {
    return (
      <div className='controls'>
        { this.props.connected ? (
        <div>
          <div className='input-wrap'>
            <label htmlFor='inputWidth'>{ 'Width' }</label>
            <input
              type='number'
              id='inputWidth'
              value={ this.props.width }
              onChange={ this.handleWidthChange }
            />
          </div>

          <div className='input-wrap'>
            <label htmlFor='inputHeight'>{ 'Height' }</label>
            <input
              type='number'
              id='inputHeight'
              value={ this.props.height }
              onChange={ this.handleHeightChange }
            />
          </div>

          <div className='input-wrap'>
            <label htmlFor='inputCount'>{ 'Count' }</label>
            <input
              type='number'
              id='inputCount'
              value={ this.props.count }
              onChange={ this.handleCountChange }
            />
          </div>

          <div className='input-wrap'>
            { Object.keys(this.props.media).map(key => {
              const media = this.props.media[key];

              return (
                <div key={ media }>
                  <label htmlFor={ media }>{ path.basename(media) }</label>
                  <input
                    type='radio'
                    name='media'
                    id={ media }
                    onChange={ this.handleMediaChange }
                    value={ media }
                    checked={ media === this.props.selectedMedia }
                  />
                </div>
              );
            } ) }
          </div>

          <div className='input-wrap'>
            <label htmlFor='inputColor'>{ 'Color' }</label>
            <input id='inputColor' type='color' value={ this.props.color } onChange={ this.handleColorChange }/>
          </div>

          <div className='input-wrap'>
            <label htmlFor='inputOpacity'>{ 'Opacity' }</label>
            <input id='inputOpacity' type='number' value={ this.props.opacity } min={ 0 } max={ 1 } step={ .01 } onChange={ this.handleOpacityChange }/>
          </div>
        </div>) : (<div>
          <h1>{ ' Connect to host' }</h1>
          <form onSubmit={ this.handleHostSubmit }>
            <input type='text' placeholder='Host IP' onChange={ this.handleHostChange } value={ this.state.host } name='host' />
          </form>
        </div>) }
      </div>
    );
  }
}

export default Controls;
