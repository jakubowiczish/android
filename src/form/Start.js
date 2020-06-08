import React, {Component} from 'react';
import {Redirect} from "react-router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import './Start.css';
import bmr from '../img/activities/BMR.jpg'
import sedentary from '../img/activities/SEDENTARY.jpg';
import light from '../img/activities/LIGHT.jpg';
import moderate from '../img/activities/MODERATE.jpg';
import active from '../img/activities/ACTIVE.jpg';
import veryActive from '../img/activities/VERY_ACTIVE.jpg';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import gain from '../img/activities/Gain.jpg'
import lose from '../img/activities/Lose.jpg'
import stay from '../img/activities/Stay.jpg'

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {active: "BMR", goal: "LOSE"},
            goal: "LOSE",
            gender: "MALE"
        }
    }

    handleSelectedActivity = selection => {
        this.setState({selected: {active: selection, goal: this.state.selected.goal}});
    };
    handleSelectedGoal = selection => {
        this.setState({selected: {active: this.state.selected.active, goal: selection}});
    };


    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: {from: this.props.location}
                }}/>;
        }

        return (
            <div className={"container"}>
                <div className="start-container parent_div_1">
                    <div className="start-content child_div_2">
                        <h1 className="start-title">Fill up starter form!</h1>
                        <StartForm handleSelectedActivity={this.handleSelectedActivity}
                                   handleSelectedGoal={this.handleSelectedGoal}
                                   selected={this.state.selected}/>
                    </div>
                </div>
                <ActivityBox className={"parent_div_1"} selected={this.state.selected}/>
            </div>
        );
    }
}

class StartForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        startDate: new Date("01/01/1990"),
        goal: "LOSE",
        gender: "MALE"
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    handleChangeGender = data => {
        this.setState({
            gender: data
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        fetch('/api/form-submit-url', {
            method: 'POST',
            body: data,
        });
    }


    render() {
        const heightTest = /^[4-9][0-9]$|^1[0-9][0-9]$|^2[0-4][0-9]$|^250$/i;
        const weightTest = /^[3-9][0-9]$|^[1-2][0-9][0-9]$|^300$/i;
        const minDate = new Date("01/01/1950");
        const maxDate = new Date(moment(new Date()).subtract(16, 'years').format("DD/MM/YYYY"));
        return (
            <Formik
                initialValues={{
                    birthDate: "",
                    gender: "MALE",
                    height: "",
                    weight: "",
                    activityLevel: "BMR",
                    goal: "LOSE"
                }}
                validate={values => {
                    let errors = {};
                    if (values.height === "") {
                        errors.height = "Height required"
                    } else if (!heightTest.test(values.height)) {
                        errors.height = "Invalid height - Correct value form 40cm - 250cm"
                    }
                    if (values.weight === "") {
                        errors.weight = "Weight required"
                    } else if (!weightTest.test(values.weight)) {
                        errors.weight = "Invalid weight - Correct value form 30kg - 300kg"
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    alert("Form is validated! Submitting the form...");
                    setSubmitting(false);
                    values.birthDate = this.state.startDate;
                    console.log(values)
                }}
            >
                {({touched, errors, isSubmitting}) => (
                    <Form>
                        <div className="form-group field">
                            <label htmlFor="birthDate">Birth date</label>
                            <DatePicker
                                name="birthDate"
                                className="form-control dateContainer"
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                minDate={minDate}
                                maxDate={maxDate}
                            />
                        </div>
                        <div className="form-group field">
                            <label htmlFor="gender">Gender</label>
                            <Field as="select"
                                   name="gender"
                                   value={this.state.gender}
                                   onChange={e => {
                                       this.handleChangeGender(e.target.value);
                                   }}
                                   className="form-control"
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </Field>
                            <ErrorMessage
                                component="div"
                                name="gender"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group field">
                            <label htmlFor="height">Height in cm</label>
                            <Field
                                type="text"
                                name="height"
                                placeholder="Enter height"
                                className={`form-control ${
                                    touched.height && errors.height ? "is-invalid" : ""
                                }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="height"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group field">
                            <label htmlFor="weight">Weight in kg</label>
                            <Field
                                type="weight"
                                name="weight"
                                placeholder="Choose weight"
                                className={`form-control ${
                                    touched.weight && errors.weight ? "is-invalid" : ""
                                }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="weight"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group field">
                            <label htmlFor="activityLevel">Activity Level</label>
                            <Field as="select"
                                   name="activityLevel"
                                   className="form-control"
                                   value={this.props.selected.active}
                                   onChange={e => {
                                       this.props.handleSelectedActivity(e.target.value);
                                   }}
                            >
                                <option value="BMR">Basal Metabolic Rate (BMR)</option>
                                <option value="SEDENTARY">Sedentary</option>
                                <option value="LIGHT">Light</option>
                                <option value="MODERATE">Moderate</option>
                                <option value="ACTIVE">Active</option>
                                <option value="VERY_ACTIVE">Very active</option>
                            </Field>
                        </div>
                        <div className="form-group field">
                            <label htmlFor="goal">Goal</label>
                            <Field as="select"
                                   name="goal"
                                   placeholder="Choose goal"
                                   className="form-control"
                                   value={this.props.selected.goal}
                                   onChange={e => {
                                       this.props.handleSelectedGoal(e.target.value);
                                   }}
                            >
                                <option value="GAIN">Weight gain</option>
                                <option value="STAY">Weight maintenance</option>
                                <option value="LOSE">Weight lose</option>
                            </Field>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Please wait..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        );
    }
}

class ActivityBox extends React.Component {

    parseHeader = header => {
        return header.charAt(0).toUpperCase() + header.slice(1).toLowerCase().replace('_', ' ')
    };
    parseActivityLevel = level => {
        if (level === 'BMR') {
            return level
        }
        return this.parseHeader(level)
    };


    render() {
        const {selected} = this.props;
        if (selected.active === undefined) {
            selected.active = 'BMR';
        }

        if (selected.goal === undefined) {
            selected.goal = 'LOSE';
        }
        let imageActive;
        let imageGoal;
        let activeDescription;
        let goalDescription;
        let header = "Activity level: " + this.parseActivityLevel(selected.active);
        let headerGoal = "Goal: " + this.parseHeader(selected.goal);
        switch (selected.active) {
            case "BMR":
                imageActive = bmr;
                activeDescription = 'The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive.';
                break;
            case "SEDENTARY":
                imageActive = sedentary;
                activeDescription = "You don't like to be in a hurry :) If you have sedentary work or your favorite exercise is reaching the remote this level is for you.";
                break;
            case "LIGHT":
                imageActive = light;
                activeDescription = "If you exercise 1-3 times per week and prefer light workouts this is your level.";
                break;
            case "MODERATE":
                imageActive = moderate;
                activeDescription = "You are very active person. Exercise 4-5 times per week aren't scary for you.";
                break;
            case "ACTIVE":
                imageActive = active;
                activeDescription = "Gym veterans.You like very intense trainings or you do your daily exercise.";
                break;
            case "VERY_ACTIVE":
                imageActive = veryActive;
                activeDescription = "Level for fit lovers and physical workers. If you could you would sleep in the gym.";
                break;
            default:
                imageActive = bmr;
                activeDescription = 'The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive.';
        }
        switch (selected.goal) {
            case "LOSE":
                imageGoal = lose;
                goalDescription = "To achieve your goal we have to cut 100-300 calories from your basic caloric level that you would enter your caloric deficit."
                break;
            case "STAY":
                imageGoal = stay;
                goalDescription = "To maintain your weight we calculate exactly how much calories do you need to consume during the day"
                break;
            case "GAIN":
                imageGoal = gain;
                goalDescription = "To gain wight we have to add 100-300 calories to your basic caloric level.The calorific increase allowed to build additional muscle mass"
                break;
            default:
                imageGoal = lose;
                goalDescription = "To achieve your goal we have to cut 100-300 calories from your basic caloric level that you would enter your caloric deficit."
        }


        return (
            <div className="start-container">
                <div className="start-content child_div_1">
                    <h2 className="start-title">{header}</h2>
                    <img src={imageActive} height={300} alt={"picture describing activity level"}/>
                    <p className={"field"}>{activeDescription}</p>
                    <h2 className="start-title">{headerGoal}</h2>
                    <img src={imageGoal} height={150} alt={"picture describing goal"}/>
                    <p>{goalDescription}</p>
                </div>
            </div>)
    }
}


export default Start