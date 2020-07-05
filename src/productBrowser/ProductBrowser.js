import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Pagination from 'react-bootstrap/Pagination'
import Button from 'react-bootstrap/Button'
import './ProductBrowser.css'
import { searchProducts } from '../util/APIUtils'

class ProductBrowser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      products: [
      ],
      pageIndex: 0,
      maxPageNumber: 0
    }
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  handleSearchTermChange (newTerm) {
    this.setState({ searchTerm: newTerm.target.value })
  }

  handleSearchButtonClick () {
    const searchTerm = this.state.searchTerm
    const perPage = 5
    searchProducts(searchTerm, 1, perPage).then(
      response => {
        this.setState({
          searchTerm: searchTerm,
          products: response.products,
          pageIndex: 1,
          maxPageNumber: response.maximumPageNumber
        })
      }
    )
  }

  createPagination () {
    const paginationElements = []
    if (this.state.maxPageNumber <= 9) {
      for (let pageIndex = 1; pageIndex <= this.state.maxPageNumber; pageIndex++) {
        paginationElements.push(
          <Pagination.Item
            key={pageIndex} active={pageIndex === this.state.pageIndex}
            onClick={() => this.changePage(pageIndex)}
          >
            {pageIndex}
          </Pagination.Item>
        )
      }
    } else {
      paginationElements.push(
        <Pagination.First
          key='first'
          disabled={this.state.pageIndex === 1}
          onClick={() => this.changePage(1)}
        />
      )
      paginationElements.push(
        <Pagination.Prev
          key='previous'
          disabled={this.state.pageIndex === 1}
          onClick={() => this.changePage(this.state.pageIndex - 1)}
        />
      )
      const startIndex = Math.min(this.state.maxPageNumber - 4, Math.max(1, this.state.pageIndex - 2))
      const endIndex = startIndex + 4
      for (let pageIndex = startIndex; pageIndex <= endIndex; pageIndex++) {
        paginationElements.push(
          <Pagination.Item
            key={pageIndex} active={pageIndex === this.state.pageIndex}
            onClick={() => this.changePage(pageIndex)}
          >
            {pageIndex}
          </Pagination.Item>
        )
      }
      paginationElements.push(
        <Pagination.Next
          key='next'
          disabled={this.state.pageIndex === this.state.maxPageNumber}
          onClick={() => this.changePage(this.state.pageIndex + 1)}
        />
      )
      paginationElements.push(
        <Pagination.Last
          key='last'
          disabled={this.state.pageIndex === this.state.maxPageNumber}
          onClick={() => this.changePage(this.state.maxPageNumber)}
        />
      )
    }
    return (
      <div className='pagination-container'>
        <Pagination>{paginationElements}</Pagination>
        <br />
      </div>
    )
  }

  render () {
    const productList = this.state.products.map(product =>
      <ProductItem
        key={product.id}
        name={product.name}
        defaultValue={product.defaultValue}
        unit={product.unit}
        calories={product.calories}
      />)

    return (
      <div className='browser-container'>
        <div className='search-container'>
          <div id='search-label'>Search for products</div>
          <InputGroup className='search-term'>
            <FormControl
              id='search-term'
              onChange={this.handleSearchTermChange}
              placeholder='Product name'
              aria-label='Product name'
            />
            <InputGroup.Append>
              <Button
                id='search-button'
                variant='dark'
                onClick={this.handleSearchButtonClick}
              >
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <div id='results-label'>Results</div>
          <div>
            {productList}
          </div>
        </div>
        {
          this.state.pageIndex > 0 && this.state.maxPageNumber > 1
            ? this.createPagination()
            : ''
        }
      </div>
    )
  }

  changePage (pageIndex) {
    const searchTerm = this.state.searchTerm
    const perPage = 5
    searchProducts(searchTerm, pageIndex, perPage).then(
      response => {
        this.setState({
          searchTerm: searchTerm,
          products: response.products,
          pageIndex: pageIndex,
          maxPageNumber: response.maximumPageNumber
        })
      }
    )
  }
}

class ProductItem extends Component {
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

export default ProductBrowser
