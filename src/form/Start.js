import React, {Component} from 'react';
import {Redirect} from "react-router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import './Start.css';
import bmrActiveImg from '../img/activities/bmr-active-img.jpg'
import sedentaryActiveImg from '../img/activities/sedentary-active-img.jpg';
import lightActiveImg from '../img/activities/light-active-img.jpg';
import moderateActiveImg from '../img/activities/moderate-active-img.jpg';
import activeActiveImg from '../img/activities/active-active-img.jpg';
import veryActiveActiveImg from '../img/activities/very_active-active-img.jpg';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import gainGoalImg from '../img/activities/gain-active-img.jpg'
import loseGoalImg from '../img/activities/lose-goal-img.jpg'
import stayGoalImg from '../img/activities/stay-goal-img.jpg'
import {createPlan} from "../util/APIUtils";
import Alert from 'react-s-alert'


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
                                   currentUser={this.props.currentUser}
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



     marks = [
        {
            value: 0,
            label: '0°C',
        },
        {
            value: 20,
            label: '20°C',
        },
        {
            value: 37,
            label: '37°C',
        },
        {
            value: 100,
            label: '100°C',
        },
    ];

     valuetext(value) {
        return `${value}°C`;
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

    handleSubmit(values) {
        values.userId = this.props.currentUser.id;
        console.log(this.props.currentUser.id)
        createPlan(values)
            .then(response => {
                Alert.success('You\'re successfully created your first diet plan')
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
        })
    }

    getFormattedDate(date) {
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return day + '/' + month + '/' + year;
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
                    values.birthDate = this.getFormattedDate(this.state.startDate);
                    values.fatPreferencesPercentage =
                    this.handleSubmit(values)
                    setSubmitting(false)
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
                imageActive = bmrActiveImg;
                activeDescription = 'The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive.';
                break;
            case "SEDENTARY":
                imageActive = sedentaryActiveImg;
                activeDescription = "You don't like to be in a hurry :) If you have sedentary work or your favorite exercise is reaching the remote this level is for you.";
                break;
            case "LIGHT":
                imageActive = lightActiveImg;
                activeDescription = "If you exercise 1-3 times per week and prefer light workouts this is your level.";
                break;
            case "MODERATE":
                imageActive = moderateActiveImg;
                activeDescription = "You are very active person. Exercise 4-5 times per week aren't scary for you.";
                break;
            case "ACTIVE":
                imageActive = activeActiveImg;
                activeDescription = "Gym veterans.You like very intense trainings or you do your daily exercise.";
                break;
            case "VERY_ACTIVE":
                imageActive = veryActiveActiveImg;
                activeDescription = "Level for fit lovers and physical workers. If you could you would sleep in the gym.";
                break;
            default:
                imageActive = bmrActiveImg;
                activeDescription = 'The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive.';
        }
        switch (selected.goal) {
            case "LOSE":
                imageGoal = loseGoalImg;
                goalDescription = "To achieve your goal we have to cut 100-300 calories from your basic caloric level that you would enter your caloric deficit."
                break;
            case "STAY":
                imageGoal = stayGoalImg;
                goalDescription = "To maintain your weight we calculate exactly how much calories do you need to consume during the day"
                break;
            case "GAIN":
                imageGoal = gainGoalImg;
                goalDescription = "To gain wight we have to add 100-300 calories to your basic caloric level.The calorific increase allowed to build additional muscle mass"
                break;
            default:
                imageGoal = loseGoalImg;
                goalDescription = "To achieve your goal we have to cut 100-300 calories from your basic caloric level that you would enter your caloric deficit."
        }


        return (
            <div className="start-container">
                <div className="start-content child_div_1">
                    <h2 className="start-title">{header}</h2>
                    <img src={imageActive} height={300} alt={"describing activity level"}/>
                    <p className={"field"}>{activeDescription}</p>
                    <h2 className="start-title">{headerGoal}</h2>
                    <img src={imageGoal} height={150} alt={"describing goal"}/>
                    <p>{goalDescription}</p>
                </div>
            </div>)
    }
}


export default Start