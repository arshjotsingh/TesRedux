import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction2 } from './';
import { Dispatch } from 'react-redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface UserState {
    user: User;
    isAuthenticated: boolean;
    isFetching: boolean;
    error: string;
}

export interface User {
    username: string;
    password: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface LoginSuccessAction {
    type: 'LOGIN_USER_SUCCESS';
    user: User;
    isFetching: boolean;
    isAuthenticated: boolean;
}

interface LoginRequestAction {
    type: 'LOGIN_USER_REQUEST';
    isFetching: boolean;
}

interface LoginFailureAction {
    type: 'LOGIN_USER_FAILURE';
    error: string;
    isFetching: boolean;
}


interface LogoutSuccessAction {
    type: 'LOGOUT_USER_SUCCESS';
    isAuthenticated: boolean;
}

interface LogoutRequestAction {
    type: 'LOGOUT_USER_REQUEST';
}

interface LogoutFailureAction {
    type: 'LOGOUT_USER_FAILURE';
    error: string;
}



// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = LoginSuccessAction | LoginRequestAction | LoginFailureAction |
    LogoutSuccessAction | LogoutRequestAction | LogoutFailureAction


// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    loginUser: (user: User): AppThunkAction2<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        let data = {
            username: "arshjot",
            password: "123"
        }

        dispatch({ type: 'LOGIN_USER_REQUEST', isFetching: true });

        return fetch('api/account', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                dispatch({ type: 'LOGIN_USER_SUCCESS', user: data, isFetching: false, isAuthenticated: true })
            })
            .catch(error => {
                dispatch({ type: 'LOGIN_USER_FAILURE', error: error, isFetching: false, isAuthenticated: false })
            });
    },

    logoutUser: (user: User): AppThunkAction2<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        dispatch({ type: 'LOGOUT_USER_REQUEST' });

        return fetch('api/todo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json() as Promise<User>)
            .then(data => {
                dispatch({ type: 'LOGOUT_USER_SUCCESS', user: data, isAuthenticated: false })
            })
            .catch(error => {
                dispatch({ type: 'LOGOUT_USER_FAILURE', error: error })
            });
    }
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: UserState = {
    user: { username: "", password: "" }, error: "", isFetching: false, isAuthenticated: false
};

export const reducer: Reducer<UserState> = (state: UserState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOGIN_USER_REQUEST':
            return {
                user: state.user,
                error: state.error,
                isFetching: action.isFetching,
                isAuthenticated: state.isAuthenticated
            };
        case 'LOGIN_USER_SUCCESS':
            return {
                user: action.user,
                error: state.error,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            };
        case 'LOGIN_USER_FAILURE':
            return {
                user: state.user,
                error: action.error,
                isFetching: action.isFetching,
                isAuthenticated: state.isAuthenticated
            };
        case 'LOGOUT_USER_REQUEST':
            return {
                user: state.user,
                error: state.error,
                isAuthenticated: state.isAuthenticated,
                isFetching: state.isFetching
            };
        case 'LOGOUT_USER_SUCCESS':
            return {
                user: state.user,
                error: state.error,
                isAuthenticated: action.isAuthenticated,
                isFetching: state.isFetching
            };
        case 'LOGOUT_USER_FAILURE':
            return {
                user: state.user,
                error: action.error,
                isAuthenticated: state.isAuthenticated,
                isFetching: state.isFetching
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};

