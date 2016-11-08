import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default function(ComposedComponent) {

  class Authenticate extends Component {

    componentWillMount() {
      if(!this.props.isAuthenticated){
        this.props.addFlashMessage({
          type: 'error',
          text: 'This pages requires login'
        });
        this.context.router.push('/login');
      }
    }

    componentWillUdate(nextProps){
      if(!nextProps.isAuthenticated){
        this.context.router.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state){
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
