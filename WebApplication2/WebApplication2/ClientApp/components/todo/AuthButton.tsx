import { fakeAuth } from "../dummy";
import { withRouter } from "react-router";
import * as React from "react";

export const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p className="text-primary">
            Welcome! <button className="btn btn-danger" onClick={() => {
                fakeAuth.signout(() => history.push('/'))
            }}>Sign out</button>
        </p>
    ) : (
            <p className="text-primary">You are not logged in.</p>
        )
))