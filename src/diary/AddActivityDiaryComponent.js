import React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Alert from 'react-s-alert'
import { floatRegex } from '../constants/ValidationConstants'
import { addUserActivity } from '../util/APIUtils'

class AddActivityDiaryComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activityTime: new Date(),
      amount: 1,
      time: 100,
      timeUnit: 'min',
    }
  }

  handleActivityTimeChange = activityTime => {
    this.setState({ activityTime: activityTime })
  }

  handleAmountChange = amount => {
    this.setState({ amount: amount })
  }

  handleTimeChange = time => {
    this.setState({ time: time })
  }

  handleTimeUnitChange = (event, timeUnit) => {
    this.setState({ timeUnit: timeUnit })
  }

  handleAddRecentActivity = (request, setSubmitting) => {
    addUserActivity(request)
      .then(() => {
        Alert.success('Activity has been successfully added to diary')
      })
      .catch(error => {
        Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  getChosenActivityName = () => this.props.selectedRow != null ? 'You have chosen: ' + this.props.selectedRow.name : 'You have not chosen any activity yet'

  isActivityChosen = () => this.props.selectedRow != null

  render () {
    const { activityTime, amount, time, timeUnit, activityId } = this.state

    return (
      <div>
        <div className={'container'}>
          <div className="diary-container parent_div_2">
            <div className="diary-content child_div_2">
              <h1 className='start-title'>{this.getChosenActivityName()}</h1>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  activityTime: activityTime,
                  amount: amount,
                  time: time,
                  timeUnit: timeUnit,
                  activityId: activityId
                }}
                validator={() => ({})}
                onSubmit={(values, { setSubmitting }) => {
                  values.activityId = this.props.selectedRow.id
                  this.handleAddRecentActivity(values, setSubmitting)
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="form-group field">
                      <label htmlFor="activityTime">Meal time</label>
                      <DateTimePicker name="activityTime"
                                      className="form-control dateContainer"
                                      value={this.state.activityTime}
                                      onChange={this.handleActivityTimeChange}
                      />
                    </div>
                    <div className="form-group field">
                      <label htmlFor="timeUnit">Time unit</label>
                      <Field as="select"
                             name="portionUnit"
                             value={this.state.timeUnit}
                             onChange={e => {
                               this.handleTimeUnitChange(e.target.value)
                             }}
                             className="form-control"
                      >
                        <option value="min">Minutes</option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="timeUnit"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group field">
                      <label htmlFor="time">Time</label>
                      <Field type="text"
                             name="time"
                             value={this.state.time}
                             onChange={e => {
                               this.handleTimeChange(e.target.value)
                             }}
                             placeholder="Enter the time"
                             className={`form-control ${touched.time && errors.time ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        component="div"
                        name="time"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group field">
                      <label htmlFor="amount">Amount</label>
                      <Field type="text"
                             name="amount"
                             value={this.state.amount}
                             onChange={e => {
                               this.handleAmountChange(e.target.value)
                             }}
                             placeholder="Enter the amount of portions"
                             className={`form-control ${touched.amount && errors.amount ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        component="div"
                        name="amount"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group field">
                      <ErrorMessage
                        component="div"
                        name="activityId"
                        className="invalid-feedback"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isSubmitting && this.isActivityChosen()}
                    >
                      {isSubmitting ? 'Please wait...' : 'Add diary entry'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddActivityDiaryComponent