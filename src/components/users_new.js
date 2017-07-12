import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { createUser } from '../actions'
import RaisedButton from 'material-ui/RaisedButton';
import { orange500 } from 'material-ui/styles/colors';
import { TextField } from 'redux-form-material-ui';


class UsersNew extends React.Component {

  renderField(field) {
    return(
      <TextField
        style={{margin: '5px'}}
        errorStyle={{
          float: "left"
        }}


        hintText={field.label}
        floatingLabelText={field.label}
        {...field}
      />
    );
  }

  onSubmit(values) {
    this.props.createUser(values, ()=>{
      this.props.history.push('/');
    });
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <Field name="username" component={this.renderField} label="Username"/>
          <Field name="email" component={this.renderField} label="Email"/>
        </div>
        <div>
          <Field type="password" name="password" component={this.renderField} label="Password"/>
          <Field type="password" name="confirmation" component={this.renderField} label="Password"/>
        </div>
        <div>
          <Field name="firstName" component={this.renderField} label="First Name"/>
          <Field name="lastName" component={this.renderField} label="Last Name"/>
        </div>
        <div>
          <Field name="street1" component={this.renderField} label="Street" />
          <Field name="city" component={this.renderField} label="City" />
        </div>
        <div>
          <Field name="street2" component={this.renderField} label="Apt/#" />
          <Field name="state" component={this.renderField} label="State" />
        </div>
        <div>
          <Field name="zipcode" component={this.renderField} label="Zipcode" />
        </div>
        <div>
          <RaisedButton type="submit" label="Sign Up" primary={true} />
          <Link to={`/users`}>
            <RaisedButton style={{margin: '5px'}} label="Cancle" secondary={true}/>
          </Link>
        </div>
      </form>
    )
  }
};

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Sorry, password too short'
  }
  if (!values.confirmation) {
    errors.confirmation = 'Required'
  } else if (values.password!==values.confirmation) {
    errors.confirmation = 'not match'
  }
  return errors
}


export default reduxForm({
  validate,
  form: 'UsersNewForm'  // a unique identifier for this form
})(
  connect(null, { createUser })(UsersNew)
);
