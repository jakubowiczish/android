import React from 'react'

import { List, Card } from 'antd'
import './FoodStatCardsList.css'
import AchievementItem from '../achievements/AchievementItem'

class FoodStatCardsList extends React.Component {
  render () {
    return (
      <List className='main'>
        {this.props.summaryList && this.props.summaryList.map(achievement =>
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
      // <List
      //   header='ES'
      //   // grid={{
      //   //   gutter: 16,
      //   //   xs: 1,
      //   //   sm: 2,
      //   //   md: 4,
      //   //   lg: 4,
      //   //   xl: 6,
      //   //   xxl: 3,
      //   // }}
      //   bordered
      //   dataSource={this.props.summaryList}
      //   renderItem={item => (
      //     <List.Item className='site-statistic-demo-card'>
      //       <Card title={item.description}>{item.sum}</Card>
      //     </List.Item>
      //   )}
      // />
    )
  }
}

export default FoodStatCardsList
