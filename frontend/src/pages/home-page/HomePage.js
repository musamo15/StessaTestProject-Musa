import React, { Component } from 'react'

import Navigation from 'src/components/navigation/navigation'

import { withRouter } from 'src/utilities/routing/withRouter.js'

import './HomePage.css'

import ShipmentForm from 'src/forms/Shipment/ShipmentForm'

class HomePage extends Component {

  redirect(path) {
    this.props.navigate(path);
  }

  render() {
    return(
      <div className='navbar-container'>
        <Navigation/>
        <div className='home-page-container'>
          <ShipmentForm/>
        </div>
      </div>
    );
  }

}

export default withRouter(HomePage);