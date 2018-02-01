import { withRouter } from "react-router";
import * as React from "react";

export const AuthButton = withRouter(({ history }) => (
        <p className="text-primary">
            Welcome! <button className="btn btn-danger" onClick={() => {
                (() => history.push('/todo'))
            }}>Add Todo</button>
        </p>
))