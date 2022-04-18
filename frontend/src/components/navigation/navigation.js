import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { withRouter } from 'src/utilities/routing/withRouter.js';

class Navigation extends Component {

  redirect(path) {
    this.props.navigate(path);
  }

  render() {
    return (
      <Navbar collapseOnSelect className='px-3' expand='lg' sticky='top' bg='white'>
        <Navbar.Brand href='/'>STESSA Test Project</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
          <Nav.Link href='/create-label'>Create Label</Nav.Link>
        </Nav>
        </Navbar.Collapse >
      </Navbar >
    )
  }

}

export default withRouter(Navigation);