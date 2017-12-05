import React, {Component} from 'react'
import Modal from 'react-modal';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import '../class.css'

const customStylesModal = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position: 'absolute',
        top: '25%',
        left: '25%',
        right: '25%',
        bottom: 'unset',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    }
};

const customTagsInput = {
    inputProps: {
        placeholder: 'Enter name or email'
    }
}

class CreateClassModal extends Component{
    constructor() {
        super()
        this.state = {
            className: '',
            membersInvited: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleChange(membersInvited) {
        this.setState({
            membersInvited: membersInvited
        })
    }

    handleChangeName(event){
        this.setState({
            className: event.target.value
        })
    }

    render(){
        const {userId, modalIsOpen, onSubmit} = this.props
        var modalTitle = 'Create New Group';
        return(
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStylesModal}
                contentLabel="Create Class Modal"

            >
                <h2>{modalTitle}</h2>
                <button className="mm-popup__close"
                        data-toggle="tooltip" data-placement="bottom" data-original-title="Close Modal"
                        onClick={this.props.closeModal}>×</button>
                <form className="create-class-modal form-horizontal" role="form">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Name your class</label>
                        <div className="col-sm-9 ">
                            <input type="text" className="form-control" id="className"
                                onChange={this.handleChangeName}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Class Name</label>
                        <div className="col-sm-9">
                            <TagsInput value={this.state.membersInvited} onChange={this.handleChange}
                                       inputProps={customTagsInput.inputProps}/>
                        </div>
                    </div>
                    <div className="modal-bottom clearfix">
                        <div className="pull-right">
                            <button className="btn btn-white" onClick={this.props.closeModal}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => onSubmit(userId, this.state.className, this.state.membersInvited)}>Create</button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default CreateClassModal;