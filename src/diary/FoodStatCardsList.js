import React from 'react'

import { List } from 'antd'
import './FoodStatCardsList.css'
import FoodStatCard from './FoodStatCard'

class FoodStatCardsList extends React.Component {
  render () {
    return (
      <div>
        <List className='main'>
          {this.props.summaryList && this.props.summaryList.map(stat =>
            <FoodStatCard
              description={stat.description}
              sum={stat.sum}
              progress={stat.progress}
              userPlan={this.props.userPlan}
            />)}
        </List>
      </div>
    )
  }
}

export default FoodStatCardsList
