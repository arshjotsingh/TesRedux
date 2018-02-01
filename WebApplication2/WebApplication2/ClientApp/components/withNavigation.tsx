import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

export interface IWithNavigationProps {
    navigate: () => void;
}

export function withNavigation<P, S>(
    Component: React.ComponentClass<P & IWithNavigationProps> | React.SFC<P & IWithNavigationProps>,
    routeWhenClicked: string): React.ComponentClass<P> {

    class C extends React.Component<P & RouteComponentProps<P>, S> {

        constructor(props: P & RouteComponentProps<P>) {
            super(props);
            this.onClick = this.onClick.bind(this);
        }

        onClick = () => {
            this.props.history.push(routeWhenClicked);
        }

        public render() {
            console.log("RENDERING WITH ");
            console.log(this.props);
            const { onClick, passThroughProps } = this.props as any;

            return (
                <Component navigate={this.onClick} {...passThroughProps} />
            );
        }
    }
    return withRouter(C);
}

export default withNavigation;