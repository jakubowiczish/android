import React from 'react'

import { List, Card } from 'antd'
import './FoodStatCardsList.css'

class FoodStatCardsList extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      list: this.props.summaryList
    }
  }

  render () {
    return (
      <List
        header='ES'
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        itemLayout='horizontal'
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

export default FoodStatCardsList
