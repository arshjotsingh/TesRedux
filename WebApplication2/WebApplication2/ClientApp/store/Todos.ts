import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import { Dispatch } from 'react-redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TodoState {
    todos: Todo[];
}

export interface Todo {
    id?: number;
    name: string;
    isComplete: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface AddTodoAction {
    type: 'ADD_TODO';
    todo: Todo;
}
interface EditTodoAction {
    type: 'EDIT_TODO';
    todo: Todo;
}
interface GetTodoAction {
    type: 'GET_TODO';
    todos: Todo[];
}
interface DeleteTodoAction {
    type: 'DELETE_TODO';
    id: number;
}



// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = AddTodoAction | GetTodoAction | EditTodoAction | DeleteTodoAction

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getTodos: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        let fetchTask = fetch(`api/todo`)
            .then(response => response.json() as Promise<Todo[]>)
            .then(data => {
                dispatch({ type: 'GET_TODO', todos: data });
            });

        //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
    },

    saveTodo: (todo: Todo): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let data = {
            name: todo.name
        }

        let postTask = fetch('api/todo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json() as Promise<Todo>)
            .then(data => {
                dispatch({ type: 'ADD_TODO', todo: data })
            });


    },

    editTodo: (todo: Todo): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let postTask = fetch('api/todo/' + todo.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        })
            .then(data => {
                dispatch({ type: 'EDIT_TODO', todo: data })
            });


    },

    deleteTodo: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {

        let postTask = fetch('api/todo/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(data => {
                dispatch({ type: 'DELETE_TODO', id: id })
            });


    },


};

export const fetchTodo = () => (dispatch: Dispatch<TodoState>) => {
    return fetch('api/todo').then(data => dispatch({ type: 'GET_TODO', todos: data }));
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TodoState = { todos: [] };

export const reducer: Reducer<TodoState> = (state: TodoState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'GET_TODO':
            return {
                todos: action.todos
            };
        case 'ADD_TODO':
            return {
                todo: action.todo,
                todos: state.todos
            };
        case 'EDIT_TODO':
            return {
                todo: action.todo,
                todos: state.todos
            };
        case 'DELETE_TODO':
            return {
                id: action.id,
                todos: state.todos
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
