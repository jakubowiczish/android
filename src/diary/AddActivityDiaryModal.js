import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import AddActivityDiaryComponent from './AddActivityDiaryComponent'
import SearchActivityComponent from '../productBrowser/SearchActivityComponent'
import './DiaryModals.css'

class AddActivityDiaryModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRows: []
    }
  }

  handleSelectedActivityChange = (selectedRows) => {
    this.setState({ selectedRows: selectedRows })
  }

  render () {
    return (
      <Modal
        {...this.props}
        size='xl'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add activity to diary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='activity_modal_body'>
            <SearchActivityComponent onSelectedActivitiesChangeHandler={this.handleSelectedActivityChange}/>
            <AddActivityDiaryComponent selectedRow={this.state.selectedRows[0]}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddActivityDiaryModal
