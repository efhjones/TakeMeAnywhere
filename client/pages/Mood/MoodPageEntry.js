import React from 'react';

class MoodPageEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var colors = ['red','blue','green','purple','pink', 'yellow'];
    var opacity = Math.random();

    var moodStyles = {
      height: 200,
      background: colors[Math.floor(Math.random() * colors.length)],
       margin: 10 + 'px',
      opacity: opacity
    }
    return (
      <div style={moodStyles} className="col-xs-3">
        {this.props.moods}
      </div>
    )
  }
}

export default MoodPageEntry;