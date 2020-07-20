import React, { Component } from 'react'
import { addRecentProduct } from '../util/APIUtils'
import Alert from 'react-s-alert'

class AddDiaryEntryDialog extends Component {

  handleAddRecentProduct = (request) => {
    // const request = {
    //   'mealType': 'BREAKFAST',
    //   'mealTime': '2020-07-14T19:20',
    //   'amount': '2.00',
    //   'portion': '1.00',
    //   'portionUnit': 'g',
    //   'productId': 1
    // }

    addRecentProduct(request)
      .then(res => {
        console.log(res)
        Alert.success('Product has been successfully added to diary')
      })
  }

  render () {
    return (
      <div>

      </div>
    )
  }
}