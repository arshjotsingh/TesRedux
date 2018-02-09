import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction2 } from './';
import { Dispatch } from 'react-redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TodoState {
    todos: Todo[];
    isFetching: boolean;
    error: string;
}

export interface Todo {
    id?: number;
    name: string;
    isComplete: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface AddTodoSuccessAction {
    type: 'ADD_TODO_SUCCESS';
    todo: Todo;
    isFetching: boolean;
}

interface AddTodoRequestAction {
    type: 'ADD_TODO_REQUEST';
    isFetching: boolean;
}

interface AddTodoFailureAction {
    type: 'ADD_TODO_FAILURE';
    error: string;
    isFetching: boolean;
}


interface EditTodoRequestAction {
    type: 'EDIT_TODO_REQUEST';
    isFetching: boolean;
}

interface EditTodoFailureAction {
    type: 'EDIT_TODO_FAILURE';
    error: string;
    isFetching: boolean;
}

interface EditTodoSuccessAction {
    type: 'EDIT_TODO_SUCCESS';
    todo: Todo;
}
interface GetTodoSuccessAction {
    type: 'GET_TODO_SUCCESS';
    todos: Todo[];
    isFetching: boolean;
}

interface GetTodoRequestAction {
    type: 'GET_TODO_REQUEST';
    isFetching: boolean;
}

interface GetTodoFailureAction {
    type: 'GET_TODO_FAILURE';
    error: string;
    isFetching: boolean;
}

interface DeleteTodoAction {
    type: 'DELETE_TODO';
    id: number;
}



// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = AddTodoFailureAction | AddTodoRequestAction | AddTodoSuccessAction |
    GetTodoSuccessAction | GetTodoRequestAction | GetTodoFailureAction |
    EditTodoSuccessAction |
    DeleteTodoAction 

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getTodos: (): AppThunkAction2<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        dispatch({ type: 'GET_TODO_REQUEST', isFetching: true });

        return fetch(`api/todo`)
            .then(response => response.json() as Promise<Todo[]>)
            .then(data => {
                dispatch({ type: 'GET_TODO_SUCCESS', todos: data, isFetching: false });
            })
            .catch(error => {
                dispatch({ type: 'GET_TODO_FAILURE', error: error, isFetching: false })
            })
            ;

        //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
    },

    saveTodo: (todo: Todo): AppThunkAction2<KnownAction> => (dispatch, getState) => {

        dispatch({ type: 'ADD_TODO_REQUEST', isFetching: true })

        let data = {
            name: todo.name
        }

        return fetch('api/todo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json() as Promise<Todo>)
            .then(data => {
                dispatch({ type: 'ADD_TODO_SUCCESS', todo: data, isFetching: false })
            })
            .catch(error => {
                dispatch({ type: 'ADD_TODO_FAILURE', error: error, isFetching: false })
            });
    },

    editTodo: (todo: Todo): AppThunkAction2<KnownAction> => (dispatch, getState) => {

        return fetch('api/todo/' + todo.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        })
            .then(data => {
                dispatch({ type: 'EDIT_TODO_SUCCESS', todo: data })
            });


    },

    deleteTodo: (id: number): AppThunkAction2<KnownAction> => (dispatch, getState) => {

        return fetch('api/todo/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(data => {
                dispatch({ type: 'DELETE_TODO', id: id })
            });

    }

};

export const fetchTodo = () => (dispatch: Dispatch<TodoState>) => {
    return fetch('api/todo').then(data => dispatch({ type: 'GET_TODO', todos: data }));
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TodoState = { todos: [], error: "", isFetching: false };

export const reducer: Reducer<TodoState> = (state: TodoState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'GET_TODO_REQUEST':
            return {
                todos: state.todos,
                error: state.error,
                isFetching: action.isFetching
            };
        case 'GET_TODO_SUCCESS':
            return {
                todos: action.todos,
                error: state.error,
                isFetching: action.isFetching
            };
        case 'GET_TODO_FAILURE':
            return {
                todos: state.todos,
                error: action.error,
                isFetching: action.isFetching
            };
        case 'ADD_TODO_SUCCESS':
            return {
                todo: action.todo,
                isFetching: state.isFetching,
                error: state.error,
                todos: state.todos
            };

        case 'ADD_TODO_FAILURE':
            return {
                isFetching: action.isFetching,
                error: action.error,
                todos: state.todos
            };

        case 'ADD_TODO_REQUEST':
            return {
                isFetching: action.isFetching,
                error: state.error,
                todos: state.todos
            };
        case 'EDIT_TODO_SUCCESS':
            return {
                todo: action.todo,
                isFetching: state.isFetching,
                error: state.error,
                todos: state.todos
            };
        case 'DELETE_TODO':
            return {
                id: action.id,
                error: state.error,
                isFetching: state.isFetching,
                todos: state.todos
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
