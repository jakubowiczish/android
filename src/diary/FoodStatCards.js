import React from 'react'

import { List, Card } from 'antd'
import './FoodStatCards.css'

class FoodStatCards extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <List
        grid={{
          gutter: 16,
          column: 4,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3
        }}
        bordered
        dataSource={this.props.summaryList}
        renderItem={item => (
          <List.Item className='site-statistic-demo-card'>
            <Card title={item.description}>{item.sum}</Card>
          </List.Item>
        )}
      />
    )
  }
}

export default FoodStatCards
