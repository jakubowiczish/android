import React, { Component } from 'react'
import './Profile.css'
import { Image } from 'react-bootstrap'
import configurationIcon from '../../img/common/configuration_icon.png'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { updateWeight } from '../../util/APIUtils'

class UserData extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      newWeight: ''
    }
    this.handleWeightChange = this.handleWeightChange.bind(this)
  }

  handleWeightChange (newTerm) {
    console.log(newTerm.target.value)
    this.setState({ newWeight: newTerm.target.value })
    // TODO: validate if new weight matches some regexp etc.
  }

  saveNewWeight () {
    const newWeight = this.state.newWeight
    console.log(newWeight)
    updateWeight({ weight: newWeight }).then(
      () => {
        //TODO: check response status code
        this.setState({
          showModal: false,
          newWeight: ''
        })
        // this.props.weight = newWeight
      }
    )
  }

  render () {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric'
    })
    return (
      <div>
        <div>
          <div className='user-data-header'>
            <b>User data </b>
            <a href='#'>
              <Image
                onClick={() => this.setState({ showModal: true })}
                src={configurationIcon} width={24} height={24}
                title='Edit your data'
              />
            </a>
          </div>
          <div className='user-data'>
            <b>Birth date: </b>{this.props.user.birthDate}
          </div>
          <div className='user-data'>
            <b>Height: </b>{this.props.user.height + 'cm'}
          </div>
          <div className='user-data'>
            <b>Current weight: </b>{this.props.weight + 'kg'}
          </div>
          <div className='user-data'>
            <b>Last login date: </b>{dateTimeFormat.format(new Date(this.props.user.lastLoginDate))}
          </div>
        </div>

        <Modal
          show={this.state.showModal} onHide={() => this.setState({ showModal: false })}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>Change your current weight</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              id='search-term'
              onChange={this.handleWeightChange}
              placeholder='Current weight'
              aria-label='Current weight'
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
            <Button variant='primary' onClick={() => this.saveNewWeight()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default UserData
