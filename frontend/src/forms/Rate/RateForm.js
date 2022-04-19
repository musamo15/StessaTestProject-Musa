import { React, Component } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import ErrorToast from 'src/components/ErrorToast/ErrorToast'

class RateForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            shipmentId: '',
            carriers: [],
            rates: {},
            selectedCarrier: '',
            selectedRate: '',
            validated: false,
            showErrorToast: false,
            errorText: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCreateShipment = this.handleCreateShipment.bind(this)
        this.setErrorVisbility = this.setErrorVisbility.bind(this)
        this.closeErrorToast = this.closeErrorToast.bind(this)
        this.renderRates = this.renderRates.bind(this)

    }

    componentDidUpdate(prevProps) {
        if (this.props.fromAddressId !== prevProps.fromAddressId || this.props.toAddressId !== prevProps.toAddressId || this.props.parcelId !== prevProps.parcelId) {
            this.handleCreateShipment()
        }
    }

    componentDidMount() {
        this.handleCreateShipment()
    }

    async handleCreateShipment() {

        if (this.props.fromAddressId !== '' && this.props.toAddressId !== '' && this.props.parcelId !== '') {
            const queryParams = {
                'from_address_id': this.props.fromAddressId,
                'to_address_id': this.props.toAddressId,
                'parcel_id': this.props.parcelId
            }

            let showError = false
            try {
                const response = await axios.post(process.env.REACT_APP_SERVER_URL + 'shipment', {}, {params: queryParams})
                if (response.status === 200) {
                    const shipmentResponse = response.data

                    const shipmentCarriers = new Set()
                    shipmentResponse.rates.forEach(rate => shipmentCarriers.add(rate.carrier))
                    this.setState({
                            shipmentId: shipmentResponse.id,
                            carriers: [...shipmentCarriers],
                            rates: shipmentResponse.rates,
                            selectedCarrier: [...shipmentCarriers][0],
                        })

                    if(shipmentResponse.rates.length <= 0) {
                        showError = true
                    }
                }
                else {
                    showError = true
                }
            } catch (error) {
                showError = true

            }
            this.setErrorVisbility(showError, 'Unable to create shipment, please enter a valid shipment')
        }
    }

    async handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            // Make an api call to create Label
            const labelParams = {
                shipment_id: this.state.shipmentId,
                rate_id: this.state.selectedRate,
            }

            let showError = false
            try {
                const response = await axios.post(process.env.REACT_APP_SERVER_URL  + 'label', {}, {params: labelParams})
                if (response.status === 200) {
                    window.open(response.data)
                }
                else {
                    showError = true
                }
            }
            catch (error) {
                showError = true
            }
            this.setErrorVisbility(showError, 'Unable to get rates')
        }
        this.setState({
            validated: true
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    setErrorVisbility(show, errorText) {
        this.setState({
            showErrorToast: show,
            errorText: errorText
        })
    }

    closeErrorToast() {
        this.setErrorVisbility(false, '')
    }

    renderRates() {

        const carrierRates = []
        for (const index in this.state.rates) {
            const rate = this.state.rates[index]
            if (rate.carrier === this.state.selectedCarrier) {
                carrierRates.push(rate)
            }
        }

        if (carrierRates.length > 0) {
            // Sort the rates based on price (lowest to highest)
            carrierRates.sort((a, b) => {
                return a.rate - b.rate
            })
            return (
                <Form.Group className="mb-3" controlId="carrierRates">
                    {
                        carrierRates.map((rate) =>
                            <div key={rate.id}>
                                <Form.Check
                                    required
                                    label={`${rate.service} -  $${rate.rate}`}
                                    name='selectedRate'
                                    type='radio'
                                    value={rate.id}
                                    onChange={(event) => this.handleChange(event)}
                                />
                                <Form.Control.Feedback type="invalid">Please select a rate.</Form.Control.Feedback>
                            </div>
                        )
                    }
                </Form.Group>
            )
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <ErrorToast show={this.state.showErrorToast} errorText={this.state.errorText} close={this.closeErrorToast} />
                </Row>
                <Row>
                    <h2>Choose carrier and rate</h2>
                </Row>
                <Row>
                    <Form noValidate validated={this.state.validated} onSubmit={(event) => this.handleSubmit(event)}>
                        <Form.Group as={Col} controlId="formGridCarrier">
                            <Form.Select name='selectedCarrier' onChange={(event) => this.handleChange(event)}>
                                {this.state.carriers.map((carrier) =>
                                    <option key={carrier}>{carrier}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        {this.renderRates()}
                        <Button as="input" type="submit" value="Buy Label" disabled={this.state.showErrorToast || this.state.selectedRate === ''} />
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default(RateForm)