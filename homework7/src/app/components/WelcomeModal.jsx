import React, {Component} from 'react';
import {Modal, ModalHeader, ModalTitle, ModalBody} from 'react-bootstrap';

export default class WelcomeModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Modal show={this.props.modalShow} onHide={this.props.handleWelcomeModalClose}>
                    <ModalHeader closeButton>
                        <ModalTitle>Welcome</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <p>Welcome in my blog, Tadeus Tunkevic admin.</p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}