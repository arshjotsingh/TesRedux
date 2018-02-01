import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';


class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: Object.assign({}, this.props.user),
            errors: {},
            loggingIn: false
        }; // using local state with loggingIn option

        this.onLogin = this.onLogin.bind(this);
        this.updateUserState = this.updateUserState.bind(this);
    }

    updateUserState(event) {
        const field = event.target.name;
        let user = Object.assign({},this.state.user);
        user[field] = event.target.value;
        return this.setState({user: user});
    }

    onLogin(event) {
        event.preventDefault();
        this.setState({
            loggingIn: true
        });
        console.log(this.state.user);
        this.props.actions.loginUser(this.state.user);
      
    }

    render() {
        return (
            <LoginForm
                user={this.state.user}
                onLogin={this.onLogin}
                loggingIn={this.props.loggingIn}
                errors={this.props.errors}
                onChange={this.updateUserState}
            />
        );
    }

    
}

function mapStateToProps(state, ownProps) {
    let user = {username:'', password:''};
    return { user:user}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

 export default connect(mapStateToProps, mapDispatchToProps) (LoginPage);

