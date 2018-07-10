import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editItem: true,
            description: props.description
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.editDescription = this.editDescription.bind(this);
        this.showDescription = this.showDescription.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    deleteHandler() {
        let newState = Object.assign({}, this.state);
        newState.deleteItem = true;
        newState.deleteTimer = setTimeout(() => { alert('deleted') }, 5000);
        this.setState(newState);
    }

    editDescription(e) {
        let newState = Object.assign({}, this.state);
        newState.description = e.target.value;
        this.setState(newState);
    }

    toggleEdit() {
        let newState = Object.assign({}, this.state);
        newState.editItem = !this.state.editItem;
        this.setState(newState);
    }

    showDescription() {
        if (this.state.editItem)
            return <div>
                        <textarea onChange={this.editDescription} name="edit-box">
                            {this.props.description}
                        </textarea>
                        <button onClick={
                            () => {
                            this.toggleEdit();
                            this.props.saveEdit(this.state.description,this.props.index)}
                        }>Save!</button>
                    </div>
        else
            return <div className={(this.state.deleteItem ? 'deleted' : '')}>
                        <p className={(this.props.complete ? 'complete' : 'todo')} onClick={this.toggleEdit}>{this.props.description}</p>
                        <button onClick={() => this.props.setTaskComplete(this.props.index)}>Mark as Complete</button>
                    </div>

    }

    render() {
        return (
            <div>
                <div className={'item-description'}>
                    {this.showDescription()}
                    <button onClick={() => this.props.deleteTask(this.props.index)}>Delete me!</button>
                </div>
            </div>
        );
    }
}

function setTaskComplete(index) {
    return {
        type: 'COMPLETE_TASK',
        payload: {
            index: index
        }
    }
}

function saveEdit(description, index) {
    return {
        type: 'EDIT_TASK',
        payload: {
            description: description,
            index: index
        }
    }
}

function deleteTask(index){
    return {
        type: 'SET_DELETE_TIMER_TASK',
        payload:{
            index: index
        }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setTaskComplete: setTaskComplete,
        saveEdit: saveEdit,
        deleteTask: deleteTask
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(ListItem);
