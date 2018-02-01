import * as React from 'react';
import { fakeAuth } from './dummy';
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom"

export default class Login extends React.Component<RouteComponentProps<{}>, {}> {

    state = {
        redirectToReferrer: false
    }
    login = () => {
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    }


    public render() {

        const { redirectToReferrer } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if (redirectToReferrer === true) {
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div>
                <p> You must login to view this page at {from.pathname}</p>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}