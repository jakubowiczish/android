import React, { Component } from 'react'
import './Profile.css'
import { Image } from 'react-bootstrap'
import configurationIcon from '../../img/common/configuration-icon.svg'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { updateWeight } from '../../util/APIUtils'
import InputGroup from 'react-bootstrap/InputGroup'

class UserData extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      newWeight: ''
    }
    this.handleWeightChange = this.handleWeightChange.bind(this)
  }

  handleWeightChange (weightInput) {
    if (/^((\d)*(\.)?(\d)?)$/.test(weightInput.target.value)) {
      this.setState({ newWeight: weightInput.target.value })
    } else {
      weightInput.target.value = this.state.newWeight
    }
  }

  saveNewWeight () {
    const newWeight = this.state.newWeight
    updateWeight({ weight: newWeight }).then(
      () => {
        this.props.changeWeight(newWeight)
        this.setState({
          showModal: false,
          newWeight: ''
        })
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
          </div>
          <div className='user-data'>
            <b>Birth date: </b>{this.props.user.birthDate}
          </div>
          <div className='user-data'>
            <b>Height: </b>{this.props.user.height + 'cm'}
          </div>
          <div className='user-data'>
            <b>Current weight: </b>{this.props.weight + 'kg '}
            <a href='#'>
              <Image
                onClick={() => this.setState({ showModal: true })}
                src={configurationIcon} width={24} height={24}
                title='Edit your data'
              />
            </a>
          </div>
          <div className='user-data'>
            <b>Last login date: </b>{dateTimeFormat.format(new Date(this.props.user.lastLoginDate))}
          </div>
        </div>

        <Modal
          show={this.state.showModal} onHide={() => this.setState({ showModal: false })}
          aria-labelledby='contained-modal-title-vcenter'
          dialogClassName='modal-90w'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className='change-current-weight-header' id='contained-modal-title-vcenter'>Change your current weight</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup>
              <FormControl
                size='lg'
                onChange={this.handleWeightChange}
                maxLength={5}
                type='number'
                placeholder='Your current weight'
                aria-label='Your current weight'
                aria-describedby='weight-addon'
              />
              <InputGroup.Append>
                <InputGroup.Text id='weight-addon' className='weight-addon'>kg</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button size='lg' variant='secondary' onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
            <Button size='lg' variant='primary' onClick={() => this.saveNewWeight()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default UserData
