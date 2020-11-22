import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import SearchProductComponent from '../productBrowser/SearchProductComponent'
import AddDiaryEntryComponent from './AddDiaryEntryComponent'
import './Diary.css'
import RecentProductsComponent from '../productBrowser/RecentProductsComponent'

class AddDiaryEntryModal extends Component {
  render () {
    return (
      <Modal
        dialogClassName='custom-dialog'
        {...this.props}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add product to the diary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='search_modal_body'>
          <SearchProductComponent
            onSelectedProductsChangeHandler={this.props.onSelectedProductChange}
            isAnyRowSelected={this.props.isAnyRowSelected}
          />
          <RecentProductsComponent
            onSelectedRecentProductsChangeHandler={this.props.onSelectedProductChange}
            isAnyRowSelected={this.props.isAnyRowSelected}
          />
          <AddDiaryEntryComponent selectedRow={this.props.getSelectedRow()} />
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-primary close-button' onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddDiaryEntryModal
