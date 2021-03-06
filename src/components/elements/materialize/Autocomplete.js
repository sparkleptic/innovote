import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import constants from './constants';
import Icon from './Icon';
import idgen from './idgen';
import "./autocomplete.css";

class Autocomplete extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.value || '',
      hide: null,
      clicked: null
    };

    this.renderIcon = this.renderIcon.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  componentWillReceiveProps ({ value }) {
    if (value !== undefined) {
      this.setState({ value });
    }
  }

  renderIcon (icon, iconClassName) {
    return <Icon className={iconClassName}>{icon}</Icon>;
  }

  renderDropdown (data, minLength, limit) {
    if (this.state.hide) { return null }
    const { value } = this.state;
    // eslint-disable-next-line
    if (minLength && minLength > value.length || !value) {
      return null;
    }
    let matches = Object.keys(data).filter(key => {
      const index = key.toUpperCase().indexOf(value.toUpperCase());
      return index !== -1 && value.length <= key.length;
    });
    if (limit) matches = matches.slice(0, limit);
    if (matches.length === 0) {
      return null;
    }
    return  (
      <ul className='autocomplete-content dropdown-content'>
        {matches.map((key, idx) => {
          const index = key.toUpperCase().indexOf(value.toUpperCase());
          return (
            <li key={key + '_' + idx} onClick={this._onAutocomplete.bind(this, key, true)}>
              {data[key] ? <img src={data[key]} alt={this.props.alt} className='right circle' /> : null}
              <span>
                {index !== 0 ? key.substring(0, index) : ''}
                <span className='highlight'>{value}</span>
                {key.length !== index + value.length ? key.substring(index + value.length) : ''}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
  __onKeyDown(evt){
    if (evt.key === "Enter"){
      evt.target.blur();
    }
  }
  _onChange (evt) {
    console.log("event", evt);
    const { onChange } = this.props;
    const value = evt.target.value;
    if (onChange) { onChange(evt, value); }
    this.setState({ value: value, hide: false });
  }
 _onBlur(evt){
   var self = this;
   const { onBlur, disableFreetext, data } = this.props;
   const value = evt.target.value;
   if (onBlur) { onBlur(evt,value); }
   if (disableFreetext && value) {
    var textExists = false;
    for (var i = 0; i < Object.keys(data).length; i++){
      if (Object.keys(data)[i].toLowerCase().indexOf(value.toLowerCase()) > -1){
        // eslint-disable-next-line        
        setTimeout(function(){
          if (!self.state.clicked){
            self.setState({ value: Object.keys(data)[i], hide: true });        
          }
          else{
            self.setState({clicked: false});
          }
        }, 100);  
        textExists = true;
        break;
      } 
    }
    if (!textExists){
      setTimeout(function(){
        console.log("Clearing");
        self.setState({ value: "", hide: true });        
      }, 50);
    }
   }
 }
  _onAutocomplete (value, evt) {
    const { onChange, onAutocomplete } = this.props;
    if (onAutocomplete) { onAutocomplete(value); }
    if (onChange) { onChange(evt, value); }

    this.setState({ value: value, hide: true, clicked: true });
  }

  render () {
    const {
      id,
      className,
      title,
      data,
      icon,
      iconClassName,
      s,
      m,
      l,
      offset,
      minLength,
      placeholder,
      limit,
      disableFreetext,
      // these are mentioned here only to prevent from getting into ...props
      value,
      onChange,
      onAutocomplete,
      ...props
    } = this.props;

    const _id = id || `autocomplete-${idgen()}`;
    const sizes = { s, m, l };
    let classes = {
      col: true
    };
    constants.SIZES.forEach(size => {
      classes[size + sizes[size]] = sizes[size];
    });

    return (
      <div
        offset={offset} className={cx('input-field', className, classes)} {...props}>
        {icon && this.renderIcon(icon, iconClassName)}
        <input
          placeholder={placeholder}
          className='autocomplete'
          id={_id}
          onChange={this._onChange}
          onKeyDown={this.__onKeyDown}
          onBlur={this._onBlur}
          type='text'
          value={this.state.value}
          autoComplete="off"
        />
        <label htmlFor={_id}>{title}</label>
        {this.renderDropdown(data, minLength, limit)}
      </div>
    );
  }
}

Autocomplete.propTypes = {
  /**
   * Uniquely identifies <input> generated by this component
   * Used by corresponding <label> for attribute
   */
  id: PropTypes.string,
  className: PropTypes.string,
  /*
   * The title of the autocomplete component.
   */
  title: PropTypes.string,
  /*
   * An object with the keys of the items to match in autocomplete
   * The values are either null or a location to an image
   */
  data: PropTypes.object.isRequired,
  /*
   * Optional materialize icon to add to the autocomplete bar
   */
  icon: PropTypes.string,
  iconClassName: PropTypes.string,
  s: PropTypes.number,
  m: PropTypes.number,
  l: PropTypes.number,
  offset: PropTypes.string,
  /*
   * Determine input length before dropdown
   */
  minLength: PropTypes.number,
  /**
   * The max amount of results that can be shown at once. Default: Infinity
   * */
  limit: PropTypes.number,
  /**
   * Placeholder for input element
   * */
  placeholder: PropTypes.string,
  /**
   * Called when the value of the input gets changed - by user typing or clicking on an auto-complete item.
   * Function signature: (event, value) => ()
   */
  onChange: PropTypes.func,
  /**
   * Called when auto-completed item is selected.
   * Function signature: (value) => ()
   */
  onAutocomplete: PropTypes.func,
  /**
   * The value of the input
   */
  value: PropTypes.string
};

export default Autocomplete;
