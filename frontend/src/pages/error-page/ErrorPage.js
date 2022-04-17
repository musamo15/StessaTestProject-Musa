import React, { Component } from 'react'

import Navigation from 'src/components/navigation/navigation'
import './ErrorPage.css'

export default class ErrorPage extends Component {

  render() {
    return (
      <div className='navbar-container'>
        <Navigation/>
        <div className='error-404-card'>
          <h3>404 Page Not Found!</h3>
        </div>
      </div>
    );
  }

}