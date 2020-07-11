import React, { Component } from 'react'
import './ProductBrowser.css'
import SearchComponent from './SearchComponent'
import RecentProductsComponent from './RecentProductsComponent'

class ProductBrowser extends Component {
  render () {
    return (
      <div>
        <SearchComponent />
        <RecentProductsComponent />
      </div>
    )
  }
}

export default ProductBrowser
