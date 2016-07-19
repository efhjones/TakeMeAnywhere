import React from 'react';
import { Router, Route, Link, hashHistory} from 'react-router';
import Calendar from 'react-input-calendar'
import moment from 'moment'
import momentRange from 'moment-range'
import Autosuggest from 'react-autosuggest';
import airports from '../../airports.js'
// import ConstraintsPageEntry from '../pages/Constraints/ConstraintsPageEntry.js';



function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return airports.filter(airports => regex.test(airports.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}


function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class ConstraintsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: getSuggestions(''),
      city: 'SFO',
      price: 400,
      depDate: '',
      returnDate: '',
      adults: 4,
      children: 0

    }
    this.changeCity = this.changeCity.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeDepDate = this.changeDepDate.bind(this);
    this.changeReturnDate = this.changeReturnDate.bind(this);
    this.changeAdults = this.changeAdults.bind(this);
    this.changeChildren = this.changeChildren.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.saveInput = this.saveInput.bind(this);
  }

  changeCity(event) {
    this.setState({city: event.target.value });
  }

  changePrice(event) {
    this.setState({price: event.target.value });
  }

  changeDepDate(event) {
    this.setState({depDate: event.target.value });
  }

  changeReturnDate(event) {
    this.setState({returnDate: event.target.value });
  }
  changeAdults(event) {
    this.setState({adults: event.target.value });
  }
  changeChildren(event) {
    this.setState({children: event.target.value});
  }

  componentDidMount() {
    this.input.focus();
  }

  onChange(event, { newValue, method }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  saveInput(autosuggest) {
    this.input = autosuggest.input;
  }


  render() {
    var formStyle = {
      width: 175
    }
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type Airport",
      value,
      onChange: this.onChange
    };
    return (
      <div>

        <h3>Airport</h3>
        <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps}
                   ref={this.saveInput} />
        <h3>Price {this.state.price}</h3>
        <input type="range"
          id="price"
          style={formStyle}
          min="100"
          max="1000"
          value={this.state.price}
          onChange={this.changePrice}
          step="50" />
        <h3>Departure Date</h3>
          <input type="date"
          className="form-control"
          style={formStyle}
          id="depDate"
          value={this.state.depDate}
          onChange={this.changeDepDate}/>
        <h3>Return Date</h3>
        <input type="date"
          className="form-control"
          style={formStyle}
          id="returnDate"
          value={this.state.returnDate}
          onChange={this.changeReturnDate} />
        <h3>Adults</h3>
        <select className="form-control"
          id="adults"
          style={formStyle}
          value={this.state.adults}
          onChange={this.changeAdults}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <h3>Children</h3>
        <select className="form-control"
          id="children"
          style={formStyle}
          value={this.state.children}
          onChange={this.changeChildren}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <br/>
        <br/>
        <button className="btn btn-primary">Submit</button>
      </div>
    )
  }

}






export default ConstraintsPage;