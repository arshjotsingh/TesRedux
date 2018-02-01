import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class Protected extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <div>
               Protected
            </div>
        )
    }
}