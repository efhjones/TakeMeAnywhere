import React from 'react';
import ResultPage from './ResultPage';
import MoodPageEntry from '../pages/Mood/MoodPageEntry.js';
  //connects this props and state in reducer
import { connect } from 'react-redux';
import { setMood } from '../actions/index';
import { setCities } from '../actions/index';
import { bindActionCreators } from 'redux';

class MoodPage extends React.Component {
  constructor(props) {
    super(props);
    this.onMoodClick = this.onMoodClick.bind(this);
  }

  onMoodClick(mood) {
    this.props.setMood(mood);
    this.props.setCities(mood);
    window.location.hash ='#/constraints';
  }

  render() {
    return (
        <div className='blueBackground container-fluid'>
        {this.props.moods.map((mood, i) =>
          <MoodPageEntry
            onMoodClick={() => this.onMoodClick(mood) }
            key={i}
            moods={mood}
            />
        )}
        </div>
    )
  }
}
//moodData will now be available as props in MoodPage class
function mapStateToProps(state) {
  return {
    moods: state.moods,
    activeMood: state.activeMood
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setMood: setMood, setCities: setCities}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MoodPage);

