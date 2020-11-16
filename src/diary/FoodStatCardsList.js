import React from 'react'

import { List } from 'antd'
import './FoodStatCardsList.css'
import FoodStatCard from './FoodStatCard'

class FoodStatCardsList extends React.Component {

  mon = () => {
    console.log(this.props.summaryList)
  }
  render () {
    return (
      <div>
      <button onClick={this.mon}>ASDADSASD</button>
      <List className='main'>
        {this.props.summaryList && this.props.summaryList.map(stat =>
          <FoodStatCard
            description={stat.description}
            difference={stat.difference}
            sum={stat.sum}
          />)}
      </List>
      </div>
    )
  }
}

export default FoodStatCardsList
