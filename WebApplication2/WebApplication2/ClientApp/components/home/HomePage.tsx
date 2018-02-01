import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

export default class HomePage extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <div className="jumbotron">
                <h1>Admin</h1>
                <p> React, Redux and React Router in ES6 </p>
                <Link to="{'/home'}" className="btn btn-primary btn-lg">Learn More</Link>
            </div>

        );
    }
}

