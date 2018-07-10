import React, { Component } from 'react';
import ListItem from './list_item.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodoList extends Component {
    constructor(props) {
        super(props);
        
        this.addItem = this.addItem.bind(this);
        this.undoDelete = this.undoDelete.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    // list functions
    addItem() {
        let newState = Object.assign({}, this.state);
        newState.items.push({ description: 'new item edit me!' });
        this.setState(newState);
    }

    undoDelete() {
        let newState = Object.assign({}, this.state);
        newState.items.forEach((item) => {
            item.deleted = false;
        });
        this.setState(newState);
    }

    renderList() {
        if(this.props.items)
            return this.props.items.map((item, index) => {
                return <ListItem key={index}
                            index={index}
                            description={item.description} 
                            deleted={item.deleted} 
                            complete={item.complete} 
                            />
            });
    }

    render() {
        return (
            <li>
                <div className={'todo-list-btn-section'}>
                    <button onClick={() => this.props.undoDelete()}>Undo deleted</button>
                    <button onClick={() => this.props.addItem()}>Add</button>
                </div>
                
                <ul>
                    {this.renderList()}

                </ul>
            </li>
        );
    }

}

function mapStateToProps(state) {
    console.log(state);
    return {items: state}
}


function addNewItem() {
    return {
        type: 'ADD_ITEM',
        payload: {
            description: 'Edit me, im new!',
            deleted: false,
            complete: false,
            deleteTimer: null
        }
    }
}

function undoDelete(){
    return {
        type: 'UNDO_DELETE'
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { 
            addItem: addNewItem,
            undoDelete: undoDelete
        }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
