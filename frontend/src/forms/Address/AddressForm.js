import { React, Component } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ErrorToast from 'src/components/ErrorToast/ErrorToast'

import { Country, State } from 'country-state-city'

class AddressForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            address: {
                name: '',
                street1: '',
                street2: '',
                city: '',
                state: '',
                zip: '',
                country: 'US',
            },
            validated: false,
            states: [],
            showErrorToast: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setErrorVisbility = this.setErrorVisbility.bind(this)
        this.closeErrorToast = this.closeErrorToast.bind(this)
    }

    componentDidMount() {

        const countryCode = Country.getCountryByCode('US')
        const states = State.getStatesOfCountry(countryCode.isoCode)

        this.setState({
            states: states
        })
    }

    handleChange(event) {
        this.setState({
            address: { ...this.state.address, [event.target.name]: event.target.value }
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
    
    async handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();

        }
        else {
            // Make an api call to create address
            let showError = false
            try {
                const response = await axios.post(process.env.REACT_APP_SERVER_URL + 'address', this.state.address)
                if (response.status === 200) {
                    this.props.addressCallback(response.data)
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

    render() {
        return (
            <div>
                <Row>
                    <ErrorToast show={this.state.showErrorToast} errorText={'Unable to verify address, please enter a valid address'} close={this.closeErrorToast} />
                </Row>

                <h3>{this.props.header}</h3>
                <Form noValidate validated={this.state.validated} onSubmit={(event) => this.handleSubmit(event)}>
                    <Form.Group className="mb-3" controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required name='name' type="name" placeholder="Enter Name" onChange={(event) => this.handleChange(event)} />
                        <Form.Control.Feedback type="invalid">Please enter a name.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridStreet1">
                        <Form.Label>Street</Form.Label>
                        <Form.Control required name='street1' placeholder="1234 Main St" onChange={(event) => this.handleChange(event)} />
                        <Form.Control.Feedback type="invalid">Please enter a street.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridStreet2">
                        <Form.Label>Street 2</Form.Label>
                        <Form.Control name='street2' placeholder="Apartment, studio, or floor" onChange={(event) => this.handleChange(event)} />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control required name='city' onChange={(event) => this.handleChange(event)} />
                            <Form.Control.Feedback type="invalid">Please enter a City.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select name='state' defaultValue="Choose" onChange={(event) => this.handleChange(event)}>
                                {this.state.states.map((item) =>
                                    <option key={item.isoCode}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control required name='zip' placeholder='37188' onChange={(event) => this.handleChange(event)} />
                            <Form.Control.Feedback type="invalid">Please enter a Zip.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Select disabled={true}>
                                <option>US</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button as="input" type="submit" value="Next" />
                </Form>
            </div>
        )
    }
}
export default (AddressForm)