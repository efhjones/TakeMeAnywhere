import React from 'react';
import ReactDOM from 'react-dom';
import ResultPageEntry from '../pages/Result/ResultPageEntry.js';
import { connect } from 'react-redux';
import { setMood } from '../actions/index';
import { bindActionCreators } from 'redux';
import resultSelector from '../actions/index';
// import session from '..actions/requestHandler';
import moodSelector from '../actions/index';
import { setFlights } from '../actions/index';
import axios from 'axios';
import NoResult from '../pages/Result/NoResults';
var Loader = require('react-loader');

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.searchFlights = this.searchFlights.bind(this);
  }

  componentWillMount() {
    var context = this;
    this.setState({
      loaded: false
    });

    this.props.cities.forEach(function(cityObj){
      context.searchFlights(context.props.constraints[0], cityObj,  function(flights) {
        context.props.setFlights(flights);
      });
    });

  };

  searchFlights(options, cityObj, callback) {

    const envelope = {
      origin: options.value,
      dest: cityObj.airport,
      depart: options.depDate,
      returned: options.returnDate,
      priceLimit: parseInt(options.price),
      adults: parseInt(options.adults),
      kids: parseInt(options.children),
      city: cityObj.city,
      cityLink: cityObj.cityLink
    };

    axios.post('/api/flights', envelope)
      .then(function(flights) {
        callback(flights);
      })
      .catch(function(err) {
        console.log("Couldn't grab flights: " + err);
      })
  }


  componentWillReceiveProps(){
    this.setState({
      loaded: true
    });
  }

  render() {
    var resultsExist = true;


    if(this.props.results.length === 0 && this.state.loaded){
        resultsExist = false;
    }

    console.log("RENDER PROPS", this.props.results);
    var options = {
    lines: 17,
    length: 28,
    width: 2,
    radius: 36,
    corners: 1,
    opacity: .05,
    rotate: 0,
    direction: 1,
    color: 'white',
    speed: 1,
    trail: 100,
    shadow: false,
    hwaccel: false,
    zIndex: 2e9,
    top: '50%',
    left: '50%',
    scale: 1.00
    };

    return (
      <div className='row row-centered'>
        <Loader loaded={this.state.loaded} options={options} className="spinner" />

        <NoResult exists = {resultsExist}/>

        {this.props.results.sort(function(a,b){
          return a.price - b.price;
        }).map((result, i) =>
          <ResultPageEntry
            key={i}
            result={result}
            className='col-xs-3 col-centered' />
        )}
      </div>
    )
  }
}
//moodData will now be available as props in MoodPage class
function mapStateToProps(state) {
  return {
    results: state.results,
    moods: state.moods,
    activeMood: state.activeMood,
    constraints: state.constraints,
    cities: state.cities
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({setFlights: setFlights, resultSelector: resultSelector, setMood: setMood, moodSelector: moodSelector}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);


