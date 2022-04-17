import { React, Component } from 'react'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import AddressForm from 'src/forms/Address/AddressForm'
import CustomParcelForm from 'src/forms/Parcel/CustomParcelForm'
import RateForm from 'src/forms/Rate/RateForm'

class ShipmentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedTab: 'fromAddress',
            fromAddressId: '',
            toAddressId: '',
            parcelId: '',
        }

        this.setTabKey = this.setTabKey.bind(this)

        this.fromAddressCallback = this.fromAddressCallback.bind(this)
        this.toAddressCallback = this.toAddressCallback.bind(this)
        this.parcellCallback = this.parcellCallback.bind(this)

    }

    setTabKey(key) {
        this.setState({
            selectedTab: key
        })
    }

    fromAddressCallback(address_id) {
        this.setState({
            fromAddressId: address_id,
            selectedTab: 'toAddress',
        })
    }

    toAddressCallback(address_id) {
        this.setState({
            toAddressId: address_id,
            selectedTab: 'parcel',
        })
    }

    parcellCallback(parcel_id) {
        this.setState({
            parcelId: parcel_id,
            selectedTab: 'rate',
        })
    }

    render() {
        return (
            <div>
                <h1>Create a Label</h1>
                <Tabs
                    id="shipment-tab"
                    activeKey={this.state.selectedTab}
                    onSelect={(key) => this.setTabKey(key)}
                    className="mb-3"
                >
                    <Tab eventKey="fromAddress" title="From Address">
                        <AddressForm header='From Address' addressCallback={this.fromAddressCallback} />
                    </Tab>

                    <Tab eventKey="toAddress" title="To Address" disabled={this.state.fromAddressId === ''} >
                        <AddressForm header='To Address' addressCallback={this.toAddressCallback} />
                    </Tab>

                    <Tab eventKey="parcel" title="Parcel" disabled={this.state.toAddressId === ''}>
                        <CustomParcelForm parcelCallback={this.parcellCallback} />
                    </Tab>

                    <Tab eventKey="rate" title="Rate" disabled={this.state.parcelId === ''}>
                        <RateForm fromAddressId={this.state.fromAddressId} toAddressId={this.state.toAddressId} parcelId={this.state.parcelId} />
                    </Tab>
                </Tabs>
            </div>
        )
    }

}
export default(ShipmentForm)
