import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextField from './TextField';
import {observer} from "mobx-react";

@observer
export default class AgentsModal extends React.Component {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onModalChange = this.onModalChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    close() {
        this.props.tableStore.showModal = false;
        this.props.tableStore.clear();
    }

    open() {
        this.props.tableStore.isEdit = false;
        this.props.tableStore.showModal = true;
        this.props.tableStore.clear();

    }

    onModalChange(field, value) {
        this.props.tableStore.setCurrentField(field,value);
    }

    handleSave(event) {

        var dev = this.props.tableStore.makeCurrentCopy();

        if (this.props.tableStore.isEdit) {
        	this.props.metadataStore.modifyDeveloper(dev, this.props.tableStore.previousPlace);
    	} else {
            this.props.metadataStore.addToDevelopers(dev);
    	}
        this.close();
    }

    handleDelete(event) {
		this.props.metadataStore.removeDeveloper(this.props.tableStore.makeCurrentCopy());
        this.close();
    }

    render() {
        const developer = this.props.tableStore.developer;
        const showModal = this.props.tableStore.showModal;
        const isEdit = this.props.tableStore.isEdit;

        return (
            <div className="form-group form-group-sm">
                <div className="col-xs-offset-5">
                    <Button bsStyle="primary" bsSize="large" onClick={this.open}>
                        Add Developer
                    </Button>

                    <Modal show={showModal} onHide={this.close} bsSize="large">
                        <Modal.Header closeButton>
                            <Modal.Title>Manage Developer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container-fluid">
                                <div className="form-horizontal">
                                    {isEdit && <div className="form-group form-group-sm row">
                                        <TextField field="place" label="Place" elementType="input" value={developer.place} onChange={this.onModalChange}/>
                                    </div>
}
                                    <div className="form-group form-group-sm row">
                                        <TextField field="first_name" label="First Name" elementType="input" value={developer.first_name} onChange={this.onModalChange}/>
                                    </div>
                                    <div className="form-group form-group-sm row">
                                        <TextField field="middle_name" label="Middle Name" elementType="input" value={developer.middle_name} onChange={this.onModalChange}/>
                                    </div>
                                    <div className="form-group form-group-sm row">
                                        <TextField field="last_name" label="Last Name" elementType="input" value={developer.last_name} onChange={this.onModalChange}/>
                                    </div>
                                    <div className="form-group form-group-sm row">
                                        <TextField field="email" label="Email" elementType="input" value={developer.email} onChange={this.onModalChange}/>
                                    </div>

                                    <div className="form-group form-group-sm row">
                                        <TextField field="affiliations" label="Affiliations" elementType="input" value={developer.affiliations} onChange={this.onModalChange}/>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                            {isEdit && <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
}
                            <Button bsStyle="primary" onClick={this.handleSave}>Save and close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}
