import React from 'react'

import { List, Card } from 'antd'
import './FoodStatCards.css'

class FoodStatCards extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.props.summaryList}
          renderItem={item => (
            <List.Item>
              <Card title={item.description}>Card content</Card>
            </List.Item>
          )}
        />
        ,
      </div>
    )
  }
}

export default FoodStatCards
