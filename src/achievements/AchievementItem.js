import React, { Component } from 'react'
import './Achievement.css'

class AchievementItem extends Component {
  render () {
    return (
      <div className='product-item'>
        <b>{this.props.name}</b>
        <b>{this.props.description}</b>
        <b>{this.props.points}</b>
        <b>{this.props.completeCondition}</b>
        <b>{this.props.photo}</b>
        <b>{this.props.progress}</b>
        <b>{this.props.completedDate}</b>
      </div>
    )
  }
}

export default AchievementItem