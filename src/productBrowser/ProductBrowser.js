import React, { Component } from 'react'
import './ProductBrowser.css'
import SearchComponent from './SearchComponent'
import RecentProductsComponent from './RecentProductsComponent'

class ProductBrowser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedProducts: [],
      selectedRecentProducts: []
    }
    this.handleSelectedProductsChange = this.handleSelectedProductsChange.bind(this)
    this.handleSelectedRecentProductsChange = this.handleSelectedRecentProductsChange.bind(this)
  }

  handleSelectedProductsChange (products) {
    this.setState({
      selectedProducts: products
    })
    this.handleSelectionChange(products, this.state.selectedRecentProducts)
  }

  handleSelectedRecentProductsChange (products) {
    this.setState({
      selectedRecentProducts: products
    })
    this.handleSelectionChange(this.state.selectedProducts, products)
  }

  handleSelectionChange (selectedProduct, selectedRecentProducts) {
    const concatenatedSelectionsWithoutDuplicates = selectedProduct
      .concat(selectedRecentProducts.filter((item) => selectedProduct.indexOf(item) < 0))
    if (this.props.onSelectionChangeHandler != null) {
      this.props.onSelectionChangeHandler(concatenatedSelectionsWithoutDuplicates)
    }
  }

  render () {
    return (
      <div>
        <SearchComponent onSelectedProductsChangeHandler={this.handleSelectedProductsChange} />
        <RecentProductsComponent onSelectedRecentProductsChangeHandler={this.handleSelectedRecentProductsChange} />
      </div>
    )
  }
}

export default ProductBrowser
