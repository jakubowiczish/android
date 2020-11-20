import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import SearchProductComponent from '../productBrowser/SearchProductComponent'
import AddDiaryEntryComponent from './AddDiaryEntryComponent'
import './Diary.css'
import RecentProductsComponent from '../productBrowser/RecentProductsComponent'

class AddDiaryEntryModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRows: []
    }
  }

  handleSelectedProductsChange = (selectedRows) => {
    this.setState({ selectedRows: selectedRows })
  }

  render () {
    return (
      <Modal
        dialogClassName='custom-dialog'
        {...this.props}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add product to the diary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='search_modal_body'>
          <SearchProductComponent onSelectedProductsChangeHandler={this.handleSelectedProductsChange}/>
          <RecentProductsComponent onSelectedRecentProductsChangeHandler={this.handleSelectedProductsChange}/>
          <AddDiaryEntryComponent selectedRow={this.state.selectedRows[0]}/>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary close-button" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddDiaryEntryModal
