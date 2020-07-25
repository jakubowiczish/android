import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import { addRecentProduct, deleteRecentProducts } from '../util/APIUtils'
import Alert from 'react-s-alert'
import SearchComponent from '../productBrowser/SearchComponent'
import AddForm from './AddForm'

class AddDiaryEntryModal extends Component {
  constructor (props) {
    super(props)
  }

  handleAddRecentProduct = () => {
    const request = {
      mealType: 'BREAKFAST',
      mealTime: '2020-07-14T19:20',
      amount: '2.00',
      portion: '1.00',
      portionUnit: 'g',
      productId: 1
    }

    addRecentProduct(request)
      .then(res => {
        console.log(res)
        Alert.success('Product has been successfully added to diary')
      })
  }

  handleDeleteRecentProduct = () => {
    const request = {
      recentProductsIds: [5, 6, 7, 8]
    }

    deleteRecentProducts(request)
      .then(res => {
        console.log(res)
        Alert.success('Product has been successfully deleted from diary')
      })
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
            Add product to the diary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {/*<SearchComponent/>*/}
          </p>
          <div>
            <AddForm/>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button onClick={this.handleAddRecentProduct}>Add product</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddDiaryEntryModal
