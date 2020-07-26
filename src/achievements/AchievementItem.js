import React, { Component } from 'react'
import './Achievement.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
class AchievementItem extends Component {
  render () {
    return (
      <div className={"achievement-div"}>
        <b>{this.props.name}</b>
        <b>{this.props.description}</b>
        <b>{this.props.points}</b>
        <b>{this.props.completeCondition}</b>
        <b>{this.props.photo}</b>
        <b>{this.props.progress}</b>
        <b>{this.props.completedDate}</b>
        <ProgressBar animated now={this.props.progress}  label={`${this.props.progress}%`}/>
      </div>
    )
  }
}

export default AchievementItem