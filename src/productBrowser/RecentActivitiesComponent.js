import React, { Component } from 'react'
import './ProductBrowser.css'
import { getRecentActivities } from '../util/APIUtils'
import PaginationComponent from './PaginationComponent'
import ActivityItemComponent from './ActivityItemComponent'

class RecentActivitiesComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activities: [],
      pageIndex: 0,
      maxPageNumber: 0
    }
    this.handleChangePage = this.handleChangePage.bind(this)
    this.loadRecentProducts()
  }

  loadRecentProducts () {
    const perPage = 6
    getRecentActivities(1, perPage).then(
      response => {
        this.setState({
          activities: response.activities,
          pageIndex: 1,
          maxPageNumber: response.maximumPageNumber
        })
      }
    )
  }

  handleChangePage (pageIndex) {
    const perPage = 6
    getRecentActivities(pageIndex, perPage).then(
      response => {
        this.setState({
          activities: response.activities,
          pageIndex: pageIndex,
          maxPageNumber: response.maximumPageNumber
        })
      }
    )
  }

  render () {
    const productList = this.state.activities.map(product =>
      <ActivityItemComponent
        key={product.id}
        name={product.name}
      />)

    return (
      <div className='recent-products-container'>
        <div className='results-container'>
          <div id='recent-products-label'>Recently added activities</div>
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

export default RecentActivitiesComponent
