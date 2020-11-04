import React, { Component } from 'react'
import List from '@material-ui/core/List'
import AchievementItem from './AchievementItem'
import { getUserAchievements } from '../util/APIUtils'

class AchievementsList extends Component {
  constructor (props) {
    super(props)
    this.getAchievements()
    this.state = {
      achievements: []
    }
  }

  getAchievements () {
    getUserAchievements().then(
      response => {
        this.setState({
          achievements: response.achievementsResponseList
        })
      }
    )
  }

  render () {
    return (
      <div>
        <div>
          <List className='main'>
            {this.state.achievements.map(achievement =>
              <AchievementItem
                key={achievement.name}
                name={achievement.name}
                description={achievement.description}
                points={achievement.points}
                completeCondition={achievement.completeCondition}
                imageUrl={achievement.imageUrl}
                progress={achievement.progress}
                completedDate={achievement.completedDate}
              />)}
          </List>
        </div>
      </div>
    )
  }
}

export default AchievementsList
