import React, { Component } from 'react'
import './ProductBrowser.css'

class ActivityItemComponent extends Component {
  render () {
    return (
      <div className='product-item'>
        <b>{this.props.name}</b>
      </div>
    )
  }
}

export default ActivityItemComponent
