import React from 'react'

class FoodStatCard extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div className='food-stat'>
        {this.props.description} : {this.props.sum}
      </div>
    )
  }
}

export default FoodStatCard
