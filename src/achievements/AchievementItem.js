import React, { Component } from 'react'
import './Achievement.css'
import { Progress } from 'reactstrap'
class AchievementItem extends Component {
  render () {
    const color = this.props.progress === this.props.completeCondition ? 'success' : ''
    const progressMade = this.props.progress ? this.props.progress : 0
    return (

      <div className='achievement-div '>
        <div className='container'>
          <div className='row'>
            <img height='250px' width='250px' id='ItemPreview' src={'data:image/png;base64,' + this.props.photo} />
            <div className='achievement-props'>
              <div className='row'>
                <h1>
                  <b>{this.props.name} </b>
                </h1>
                <p>({this.props.points} points)</p>
              </div>
              <div className='achievement-details'>
                <b>Description: {this.props.description}</b>
                <br />
                {this.props.completedDate ? <b>Completed: {this.props.completedDate.replace('T', ' ')}</b> : ''}
              </div>
            </div>
          </div>
        </div>
        <div className='text-center'>{this.props.progress} of {this.props.completeCondition}</div>
        <Progress color={`${color}`} animated value={progressMade} max={this.props.completeCondition} />
      </div>
    )
  }
}

export default AchievementItem
