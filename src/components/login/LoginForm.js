import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { login } from '../../actions/authActions';

function validateInput(data) {
  let errors = {};

  if(!data.identifier){
    errors.identifier = 'This field is required';
  }
  if(!data.password){
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

class LoginForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if(!isValid){
      this.setState({ errors })
    }

    return isValid;
  }

  onSubmit(e){
    e.preventDefault();

    if(this.isValid()) {
      this.setState({errors: {}, isLoading: true });
      this.props.login(this.state)
      .then(
        () => {
          this.context.router.push('/');
        },
        (err) => {
          this.setState({ errors: err.response.data.errors, isLoading: false})
        }
      );
    }
  }

  render(){
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form  && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          type="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
        />

        <div className="form-group">
          <button
            disabled={isLoading}
            className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
//   addFlashMessage: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);
