import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

export default class AboutPage extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <div>
                <h1>About</h1>
                <p> This application uses React, Redux, React Router and a variety of other helpful libraries. </p>
            </div>
        );
    }
}

