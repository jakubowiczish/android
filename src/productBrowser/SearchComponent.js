import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './ProductBrowser.css'
import { searchProducts } from '../util/APIUtils'
import ProductItemComponent from './ProductItemComponent'
import PaginationComponent from './PaginationComponent'

class SearchComponent extends Component {
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
    this.handleChangePage = this.handleChangePage.bind(this)
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

  handleChangePage (pageIndex) {
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
        <PaginationComponent
          pageIndex={this.state.pageIndex}
          maxPageNumber={this.state.maxPageNumber}
          onClick={this.handleChangePage}
        />
      </div>
    )
  }
}

export default SearchComponent
