import * as React from 'react';
import { fakeAuth } from '../dummy';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IWithPersonalizationProps, withPersonalization } from './withPersonalization';
import { IWithNavigationProps, withNavigation } from './withNavigation';

interface IWelcomeOwnProps { }

type IWelcomeProps = IWelcomeOwnProps & IWithNavigationProps & IWithPersonalizationProps;

export class Welcome extends React.Component<IWelcomeProps,{}> {

    constructor(props: IWelcomeProps) {
        super(props);
        this.onNameClicked = this.onNameClicked.bind(this);
    }

    public render() {
        return (
            <div onClick={this.onNameClicked}> Welcome, {this.props.name}!</div>

            );
    }

    private onNameClicked<P>(event: React.MouseEvent<P>) {
        event.preventDefault();
        this.props.navigate();
    }

}

export default withNavigation(withPersonalization(Welcome),"/");
//    return fakeAuth.isAuthenticated === true ?
//        <h2>
//            Welcome! <button onClick={() => {
//                fakeAuth.signout(() => this.props.history.push('/'))
//            }}> Sign Out </button>
//        </h2>
//        : <h2> You are not logged in </h2>

//}

//export default withRouter(AuthButton);