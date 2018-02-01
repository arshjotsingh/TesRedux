import React from 'react';
import TextInput from '../common/TextInput';
import toastr from 'toastr';

const LoginForm = ({user, onLogin, onChange, loggingIn, errors}) => {
    return (
        <form>
            <h1>Login User</h1>
            <TextInput
                name="username"
                label="Username"
                value={user.username}
                onChange={onChange}
                error={errors} />
            
            <TextInput  
                name="password"
                label="Password"
                value={user.password}
                onChange={onChange}
                error={errors} />

            <input 
                type="submit"
                disabled={loggingIn}
                value={loggingIn ? 'Logging...' : 'Log In'}
                className="btn btn-primary"
                onClick={onLogin} />
        </form>
    );
};


LoginForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onLogin: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    loggingIn: React.PropTypes.bool,
    errors: React.PropTypes.object   
};

export default LoginForm;