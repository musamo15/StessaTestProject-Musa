import { React, Component } from 'react'

import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

class ErrorToast extends Component  {
    
    render() {
        return (
            <ToastContainer className="position-relative top-end">
                <Toast onClose={() => this.props.close()} show={this.props.show} delay={5000} autohide bg='danger' animation={true}>
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{this.props.errorText}</Toast.Body>
                </Toast>
            </ToastContainer>
        )
    }
}
export default(ErrorToast)
