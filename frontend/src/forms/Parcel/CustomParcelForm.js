import React, { Component } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ErrorToast from 'src/components/ErrorToast/ErrorToast'

class CustomParcelForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            parcel: {
                length: 0,
                width: 0,
                height: 0,
                weight: 0,
            },
            error: false,
            validated: false,
            showErrorToast: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setErrorVisbility = this.setErrorVisbility.bind(this)
        this.closeErrorToast = this.closeErrorToast.bind(this)
    }

    handleChange(event) {
        this.setState({
            parcel: { ...this.state.parcel, [event.target.name]: event.target.value }
        })
    }

    async handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();

        }
        else {
            // Make an api call to create parcel
            let showError = false
            try {
                const response =  await axios.post(process.env.REACT_APP_SERVER_URL+ 'parcel', this.state.parcel)
                if (response.status === 200) {
                    this.props.parcelCallback(response.data)
                }
                else {
                    showError = true
                }
            } catch (error) {
                showError = true
            }
            this.setErrorVisbility(showError)
        }
        this.setState({
            validated: true
        })
    }

    setErrorVisbility(show) {
        this.setState({
            showErrorToast: show,
        })
    }

    closeErrorToast() {
        this.setErrorVisbility(false)
    }

    render() {
        return (
            <div>
                <ErrorToast show={this.state.showErrorToast} errorText={'Unable to verify parcel dimensions, please enter a valid dimensions'} close={this.closeErrorToast} />
                <h2>Parcel</h2>
                <Form noValidate validated={this.state.validated} onSubmit={(event) => this.handleSubmit(event)}>
                    <Form.Group className="mb-3" controlId="formGridLength">
                        <Form.Label>Length</Form.Label>
                        <input className='form-control' 
                        required type='number' step='.1' min={.1} name='length' placeholder="Enter length in inches" onChange={(event) => this.handleChange(event)} />
                        <Form.Control.Feedback type="invalid">Please enter a valid length.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridWidth">
                        <Form.Label>Width</Form.Label>
                        <input className='form-control' 
                        required type='number' step='.1' min={.1} name='width' placeholder="Enter width in inches" onChange={(event) => this.handleChange(event)} />
                        <Form.Control.Feedback type="invalid">Please enter a valid width.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridHeight">
                        <Form.Label>Height</Form.Label>
                        <input className='form-control' 
                        required type='number' step='.1' min={.1} name='height' placeholder="Enter height in inches" onChange={(event) => this.handleChange(event)} />
                        <Form.Control.Feedback type="invalid">Please enter a valid height.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridWeight">
                        <Form.Label>Weight</Form.Label>
                        <input className='form-control' 
                        required type='number' step='.1' min={.1} name='weight' placeholder="Enter weight in inches" onChange={(event) => this.handleChange(event)} />
                        <Form.Control.Feedback type="invalid">Please enter a valid weight.</Form.Control.Feedback>
                    </Form.Group>

                    <Button as="input" type="submit" value="Next" />
                </Form>
            </div>
        )
    }
}

export default(CustomParcelForm)