import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import AddActivityDiaryComponent from './AddActivityDiaryComponent'
import SearchActivityComponent from '../productBrowser/SearchActivityComponent'
import './DiaryModals.css'
import RecentActivitiesComponent from '../productBrowser/RecentActivitiesComponent'

class AddActivityDiaryModal extends Component {
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
            Add activity to diary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='activity_modal_body'>
          <SearchActivityComponent
            onSelectedActivitiesChangeHandler={this.props.onSelectedActivityChange}
            isAnyRowSelected={this.props.isAnyRowSelected}
          />
          <RecentActivitiesComponent
            onSelectedRecentActivitiesChangeHandler={this.props.onSelectedActivityChange}
            isAnyRowSelected={this.props.isAnyRowSelected}
          />
          <AddActivityDiaryComponent selectedRow={this.props.getSelectedRow()} />
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-primary close-button' onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddActivityDiaryModal
