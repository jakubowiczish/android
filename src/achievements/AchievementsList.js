import React, { Component } from 'react'
import List from '@material-ui/core/List'
import AchievementItem from './AchievementItem'
import { getUserAchievements } from '../util/APIUtils'

class AchievementsList extends Component {
  constructor (props) {
    super(props)
    this.getAchievements();
  }
  getAchievements () {
    getUserAchievements().then(
      response => {
        this.setState({
          achievements: response,
        })
      }
    )
  }

  render () {
    const userAchievements = this.state.achievements.map(achievement =>
      <AchievementItem
        name={achievement.name}
        description={achievement.description}
        points={achievement.points}
        completeCondition={achievement.completeCondition}
        photo={achievement.photo}
        progress={achievement.progress}
        completedDate={achievement.completedDate}
      />)

    return (
      <div>
      <div>ASADSdasasdasd</div>
      <div>
        <List>
          {userAchievements}
        </List>
      </div>
      </div>
    )
  }
}

export default AchievementsList