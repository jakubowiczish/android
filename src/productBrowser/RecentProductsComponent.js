import React, { Component } from 'react'
import './ProductBrowser.css'
import { getRecentProducts } from '../util/APIUtils'
import ProductItemComponent from './ProductItemComponent'
import PaginationComponent from './PaginationComponent'

class RecentProductsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [
      ],
      pageIndex: 0,
      maxPageNumber: 0
    }
    this.handleChangePage = this.handleChangePage.bind(this)
    this.loadRecentProducts()
  }

  loadRecentProducts () {
    const perPage = 6
    getRecentProducts(1, perPage).then(
      response => {
        this.setState({
          products: response.products,
          pageIndex: 1,
          maxPageNumber: response.maximumPageNumber
        })
      }
    )
  }

  handleChangePage (pageIndex) {
    const perPage = 6
    getRecentProducts(pageIndex, perPage).then(
      response => {
        this.setState({
          products: response.products,
          pageIndex: pageIndex,
          maxPageNumber: response.maximumPageNumber
        })
      }
    )
  }

  render () {
    const productList = this.state.products.map(product =>
      <ProductItemComponent
        key={product.id}
        name={product.name}
        defaultValue={product.defaultValue}
        unit={product.unit}
        calories={product.calories}
      />)

    return (
      <div className='recent-products-container'>
        <div className='results-container'>
          <div id='recent-products-label'>Recently added products</div>
          <div>
            {productList}
          </div>
        </div>
        <PaginationComponent
          pageIndex={this.state.pageIndex}
          maxPageNumber={this.state.maxPageNumber}
          onClick={this.handleChangePage}
        />
      </div>
    )
  }
}

export default RecentProductsComponent
