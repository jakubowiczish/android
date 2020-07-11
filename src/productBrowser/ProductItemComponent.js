import React, { Component } from 'react'
import './ProductBrowser.css'

class ProductItemComponent extends Component {
  render () {
    return (
      <div className='product-item'>
        <b>{this.props.name}</b>
        <br />
        {`${this.props.defaultValue}${this.props.unit}`}
        <br />
        {this.props.calories}kcal
      </div>
    )
  }
}

export default ProductItemComponent
