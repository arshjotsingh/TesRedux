import * as React from "react"
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom"
import { fakeAuth } from "./dummy";
import { ApplicationState } from "ClientApp/store";
import { connect } from "react-redux";
import * as UserState from '../store/User';
import { TextInput } from '../components/common/TextInput';

type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>

export const PrivateRoute: React.StatelessComponent<RouteProps> = ({ component, ...rest }) => {
    const renderFn = (Component?: RouteComponent) => (props: RouteProps) => {
        if (!Component) {
            return null
        }

        if (fakeAuth.isAuthenticated) {
            return <Component {...props} />
        }

        const redirectProps = {
            to: {
                pathname: "/login",
                state: { from: props.location },
            },
        }

        return <Redirect {...redirectProps} />
    }

    return <Route {...rest} render={renderFn(component)} />
}



//export class PrivateRoute extends React.Component<boolean,, {}> {

//    constructor(props: UserProps) {
//        super(props);
//    }

//    public render() {

//        const { from } = this.props.location.state || { from: { pathname: '/' } }

//        if (this.props.isAuthenticated === true) {
//            return (
//                <Redirect to={from} />
//            )
//        }

//        return (
//            <div>
//            </div>
//        )
//    }
//}

//export default connect(
//    (state: ApplicationState) => state.user.isAuthenticated
//)(PrivateRoute) as typeof PrivateRoute; // two function calls