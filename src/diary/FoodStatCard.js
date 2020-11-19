import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

class FoodStatCard extends React.Component {
  componentDidMount () {
    const script = document.createElement('script')

    script.src = './CircleScript.js'
    script.async = true
    document.body.appendChild(script)
  }

  render () {
    console.log(this.props)
    return (
      <div className={`stater  ${this.props.description}`} >
        <div className={`food-stat`}>
          {this.props.description}
        </div>
        <CircularProgressbar
          className={`circle ${this.props.description + 'circle'}`}  value={this.props.sum} text={this.props.sum} styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `rgba(62, 152, 199, ${this.props.sum / 100})`,
            textColor: '#ffffff',
            trailColor: '#25cc76',
            backgroundColor: '#3e98c7'
          })}
        />;
      </div>
    )
  }
}

export default FoodStatCard
