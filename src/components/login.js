import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin, fetchUsers } from '../actions';


import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';


class Login extends Component {

  state = { token: ''}

  renderField(field) {
    return(
      <TextField
        style={{margin: '5px'}}
        hintText={field.label}
        floatingLabelText={field.label}
        {...field}
      />
    );
  }

  onSubmit(values) {
    this.props.userLogin(values, browserHistory.push);
  }



  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <Field name="email" component={this.renderField} label="Email"/>
        </div>
        <div>
          <Field name="password" component={this.renderField} label="Password"/>
        </div>
        <div>
          <RaisedButton type="submit" label="Login" primary={true} />
          <Link to={`/`}>
            <RaisedButton style={{margin: '5px'}} label="Cancle" secondary={true}/>
          </Link>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return { ...state, token: state.token };
}

export default reduxForm({
  form: 'UsersLoginForm'  // a unique identifier for this form
})(
  connect(mapStateToProps, { userLogin, fetchUsers })(Login)
);
