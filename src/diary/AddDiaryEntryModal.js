import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React from 'react'
import { addRecentProduct, deleteRecentProducts } from '../util/APIUtils'
import Alert from 'react-s-alert'
import SearchComponent from '../productBrowser/SearchComponent'

function AddDiaryEntryModal (props) {
  function handleAddRecentProduct () {
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

  function handleDeleteRecentProduct () {
    const request = {
      recentProductsIds: [5, 6, 7, 8]
    }

    deleteRecentProducts(request)
      .then(res => {
        console.log(res)
        Alert.success('Product has been successfully deleted from diary')
      })
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add product to the diary
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <SearchComponent />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={handleDeleteRecentProduct}>Add product</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddDiaryEntryModal
