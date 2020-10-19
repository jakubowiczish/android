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
      mealType: 'Activities',
      amount: 1,
      portion: 100,
      portionUnit: 'min',
    }
  }

  handleActivityTimeChange = activityTime => {
    this.setState({ activityTime: activityTime })
  }

  handleAmountChange = amount => {
    this.setState({ amount: amount })
  }

  handlePortionChange = portion => {
    this.setState({ portion: portion })
  }

  handlePortionUnitChange = (event, portionUnit) => {
    this.setState({ portionUnit: portionUnit })
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
    const { activityTime, mealType, amount, portion, portionUnit, productId } = this.state

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
                  mealType: mealType,
                  amount: amount,
                  portion: portion,
                  portionUnit: portionUnit,
                  productId: productId
                }}
                validate={values => {
                  let errors = {}
                  if (values.portion === '' || !floatRegex.test(values.portion)) {
                    errors.portion = 'Invalid time size - must be positive number with no more than 2 decimal places'
                  }
                  if (values.amount === '' || !floatRegex.test(values.amount)) {
                    errors.amount = 'Invalid amount size - must be positive number with no more than 2 decimal places'
                  }
                  return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                  values.productId = this.props.selectedRow.id
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
                      <label htmlFor="mealType">Meal type</label>
                      <Field as="select"
                             name="mealType"
                             value={this.state.mealType}
                             onChange={e => {
                               this.handleMealTypeChange(e.target.value)
                             }}
                             className="form-control"
                      >
                        <option value="BREAKFAST">Breakfast</option>
                        <option value="LUNCH">Lunch</option>
                        <option value="DINNER">Dinner</option>
                        <option value="SUPPER">Supper</option>
                        <option value="SNACK">Snack</option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="mealType"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group field">
                      <label htmlFor="portionUnit">Portion unit</label>
                      <Field as="select"
                             name="portionUnit"
                             value={this.state.portionUnit}
                             onChange={e => {
                               this.handlePortionUnitChange(e.target.value)
                             }}
                             className="form-control"
                      >
                        <option value="g">Grams</option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="portionUnit"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group field">
                      <label htmlFor="portion">Portion size</label>
                      <Field type="text"
                             name="portion"
                             value={this.state.portion}
                             onChange={e => {
                               this.handlePortionChange(e.target.value)
                             }}
                             placeholder="Enter the time"
                             className={`form-control ${touched.portion && errors.portion ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        component="div"
                        name="portion"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group field">
                      <label htmlFor="amount">Amount of portions</label>
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
                        name="productId"
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