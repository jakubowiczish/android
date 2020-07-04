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
    const pageIndex = this.state.pageIndex > 0 ? this.state.pageIndex : 1
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

  render () {
    const productList = this.state.products.map(product =>
      <ProductItem
        key={product.id}
        name={product.name}
        defaultValue={product.defaultValue}
        unit={product.unit}
        calories={product.calories}
      />)

    const paginationElements = []
    for (let pageNumber = 1; pageNumber <= this.state.maxPageNumber; pageNumber++) {
      paginationElements.push(
        <Pagination.Item key={pageNumber} active={pageNumber === this.state.pageIndex} onClick={() => this.changePage(pageNumber)}>
          {pageNumber}
        </Pagination.Item>
      )
    }
    const pagination = (
      <div>
        <Pagination>{paginationElements}</Pagination>
        <br />
      </div>
    )

    return (
      <div>
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
          {
            this.state.pageIndex > 0 && this.state.maxPageNumber > 0
              ? pagination
              : ''
          }
        </div>
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
        {this.props.calories}
      </div>
    )
  }
}

export default ProductBrowser
