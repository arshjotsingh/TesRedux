import * as React from 'react';
import { fakeAuth } from './dummy';
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom"
import * as UserState from '../store/User';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { TextInput } from '../components/common/TextInput';


type UserProps =
    UserState.UserState        // ... state we've requested from the Redux store
    & typeof UserState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>;


export interface localState {
    user: UserState.User;
    redirectToReferrer: boolean;
    onChange: (event: any) => void;
    Login: (event: any) => void;
}

export class Login extends React.Component<UserProps, localState> {

    constructor(props: UserProps) {
        super(props);
        this.state = {
            user: this.props.user,
            redirectToReferrer: false,
            Login : this.login,
            onChange : this.onChange
        }

        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    }


    
    public login = (event: any) => {
        Promise.resolve(this.props.loginUser(this.state.user));
    }


    public onChange(event: any): void {
        let user = Object.assign({}, this.state.user);
        switch (event.target.name) {
            case "username": {
                user.username = event.target.value;
                break;
            }
            case "password": {
                user.password = event.target.value;
                break;
            }
            default: {
                break;
            }
        }

        return this.setState({ user: user });
    }

    public render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if (this.props.isAuthenticated === true) {
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div>
                <TextInput name="username"
                    label="Username"
                    value={this.state.user.username}
                    onChange={this.onChange}
                    error={this.props.error} />
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    UserState.actionCreators
)(Login) as typeof Login; // two function calls