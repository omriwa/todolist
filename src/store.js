import { createStore } from 'redux';
import { combineReducers } from 'redux';

const dataStore = {
    items: [
        //     {
        //     description: 'blaaaa',
        //     deleted: false,
        //     complete: false,
        //     deleteTimer: null
        // }
    ]
}


const store = createStore((state = dataStore.items, action) => {
    let newState = state.slice(),
        item;

    switch (action.type) {
        case ('ADD_ITEM'):
            newState.push(action.payload);

            return newState

        case ('COMPLETE_TASK'):
            item = Object.assign({}, newState[action.payload.index]);
            item.complete = true;
            newState.splice(action.payload.index, 1, item);
            return newState;

        case ('EDIT_TASK'):
            item = Object.assign({}, newState[action.payload.index]);
            item.description = action.payload.description;
            newState.splice(action.payload.index, 1, item);
            return newState;

        case ('SET_DELETE_TIMER_TASK'):
            item = Object.assign({}, newState[action.payload.index]);
            item.deleteTimer = setTimeout(() => {
                store.dispatch({
                    type: 'DELETE_TASK',
                    payload: {
                        index: action.payload.index
                    }
                })
            }, 3000);
            newState.splice(action.payload.index, 1, item);
            return newState;

        case ('DELETE_TASK'):
            item = Object.assign({}, newState[action.payload.index]);
            item.description = action.payload.description;
            newState.splice(action.payload.index, 1);
            return newState;

        case ('UNDO_DELETE'):
            newState.forEach((item) => {
                if (item.deleteTimer)
                    clearTimeout(item.deleteTimer);
            });
            return newState;
        default:
            return state;
    }
});



export default store;
