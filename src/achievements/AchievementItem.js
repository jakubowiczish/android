import React, { Component } from 'react'
import './Achievement.css'
import { Progress } from 'reactstrap'
class AchievementItem extends Component {
  render () {
    const color = this.props.progress === this.props.completeCondition ? 'success' : ''
    const progressMade = this.props.progress ? this.props.progress : 0
    return (
      <div className='wrap wrap--3'>
        <div className={`achievement-card container4 container--4  ${color}`}>
          <div className='form-group field'>
            <label className='label' htmlFor='slider'>{this.props.name}</label>
          </div>
          <p className='label2'>({this.props.points} points)</p>
          <div className='achievement-props'>
            <div className='container'>
              <div className='row'>
                <img className='achievement-photo' height='100px' width='100px' id='ItemPreview' src={'data:image/png;base64,' + this.props.photo} />
              </div>
              <div className='achievement-details'>
                <b>Description: {this.props.description}</b>
                {this.props.completedDate ? <b>Completed: {this.props.completedDate.replace('T', ' ')}</b> : ''}
              </div>
              <div className='text-center'>{this.props.progress} of {this.props.completeCondition}</div>
              <Progress color={`${color}`} animated value={progressMade} max={this.props.completeCondition} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AchievementItem
