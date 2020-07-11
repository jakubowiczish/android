import React, { Component } from 'react'
import './ProductBrowser.css'
import Pagination from 'react-bootstrap/Pagination'

class PaginationComponent extends Component {
  createPagination () {
    const paginationElements = []
    if (this.props.maxPageNumber <= 9) {
      for (let pageIndex = 1; pageIndex <= this.props.maxPageNumber; pageIndex++) {
        paginationElements.push(
          <Pagination.Item
            key={pageIndex} active={pageIndex === this.props.pageIndex}
            onClick={() => this.props.onClick(pageIndex)}
          >
            {pageIndex}
          </Pagination.Item>
        )
      }
    } else {
      paginationElements.push(
        <Pagination.First
          key='first'
          disabled={this.props.pageIndex === 1}
          onClick={() => this.props.onClick(1)}
        />
      )
      paginationElements.push(
        <Pagination.Prev
          key='previous'
          disabled={this.props.pageIndex === 1}
          onClick={() => this.props.onClick(this.props.pageIndex - 1)}
        />
      )
      const startIndex = Math.min(this.props.maxPageNumber - 4, Math.max(1, this.props.pageIndex - 2))
      const endIndex = startIndex + 4
      for (let pageIndex = startIndex; pageIndex <= endIndex; pageIndex++) {
        paginationElements.push(
          <Pagination.Item
            key={pageIndex} active={pageIndex === this.props.pageIndex}
            onClick={() => this.props.onClick(pageIndex)}
          >
            {pageIndex}
          </Pagination.Item>
        )
      }
      paginationElements.push(
        <Pagination.Next
          key='next'
          disabled={this.props.pageIndex === this.props.maxPageNumber}
          onClick={() => this.props.onClick(this.props.pageIndex + 1)}
        />
      )
      paginationElements.push(
        <Pagination.Last
          key='last'
          disabled={this.props.pageIndex === this.props.maxPageNumber}
          onClick={() => this.props.onClick(this.props.maxPageNumber)}
        />
      )
    }
    return (
      <Pagination>{paginationElements}</Pagination>
    )
  }

  render () {
    return (
      <div className='pagination-container'>
        {
          this.props.pageIndex > 0 && this.props.maxPageNumber > 1
            ? this.createPagination()
            : ''
        }
        <br />
      </div>
    )
  }
}

export default PaginationComponent
