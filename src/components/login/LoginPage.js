import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm.js';

class LoginPage extends Component{
  render(){
    // const { userLoginRequest, addFlashMessage } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm />
        </div>
      </div>
    );
  }
}

// LoginPage.propTypes = {
//   userLoginRequest: React.PropTypes.func.isRequired,
//   addFlashMessage: React.PropTypes.func.isRequired
// }

export default connect(null)(LoginPage);
