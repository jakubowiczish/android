import * as React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addRecentProduct } from '../util/APIUtils'
import Alert from 'react-s-alert'
import { floatRegex } from '../constants/ValidationConstants'
import { FormText } from 'react-bootstrap'

class AddForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mealTime: new Date(),
      mealType: 'BREAKFAST',
      amount: 1,
      portion: 100,
      portionUnit: 'g'
    }
  }

  handleMealTimeChange = (mealTime) => {
    this.setState({ mealTime: mealTime })
  }

  handleMealTypeChange = (mealType) => {
    this.setState({ mealType: mealType })
  }

  handlePortionUnitChange = (portionUnit) => {
    this.setState({ portionUnit: portionUnit })
  }

  handleAddRecentProduct = (request, setSubmitting) => {
    addRecentProduct(request)
      .then(res => {
        console.log(res)
        Alert.success('Product has been successfully added to diary')
      })
      .catch(error => {
        Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  render () {
    return (
      <div>
        <div className={'container'}>
          <div className="start-container parent_div_1">
            <div className="start-content child_div_2">
              <Formik
                initialValues={{
                  mealTime: new Date(),
                  mealType: 'BREAKFAST',
                  amount: 1,
                  portion: 100,
                  portionUnit: 'g',
                  productId: -1
                }}
                validate={values => {
                  let errors = {}
                  if (values.portion === '' || !floatRegex.test(values.portion)) {
                    errors.portion = 'Invalid portion size - must be positive number with no more than 2 decimal places'
                  }
                  if (values.amount === '' || !floatRegex.test(values.amount)) {
                    errors.amount = 'Invalid amount size - must be positive number with no more than 2 decimal places'
                  }
                  return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                  values.productId = this.props.selectedRow.id
                  this.handleAddRecentProduct(values, setSubmitting)
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="form-group field">
                      <label htmlFor="mealTime">Meal time</label>
                      <DateTimePicker
                        name="mealTime"
                        className="form-control dateContainer"
                        value={this.state.mealTime}
                        onChange={this.handleMealTimeChange}
                      />
                    </div>
                    <div className="form-group field">
                      <label htmlFor="mealType">Meal type</label>
                      <Field
                        as="select"
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
                      <Field
                        as="select"
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
                      <Field
                        type="text"
                        name="portion"
                        placeholder="Enter the portion size"
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
                      <Field
                        type="text"
                        name="amount"
                        placeholder="Enter the amount of portions"
                        className={`form-control ${touched.amount && errors.amount ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        component="div"
                        name="amount"
                        className="invalid-feedback"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isSubmitting}
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

export default AddForm