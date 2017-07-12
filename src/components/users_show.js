import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { Link } from 'react-router-dom';
import { TextField } from 'redux-form-material-ui';
import { fetchUser, updateUser } from '../actions';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

class UsersShow extends Component {
  componentDidMount() {
    //console.log("this",this);
    this.handleInitialize();
    if(!this.props.user) {
      const { username } = this.props.match.params.username;
      this.props.fetchUser(username);
    }
  }

  handleInitialize() {
    const initData = {
      "username": this.props.user.username,
      "email": this.props.user.email,
      "firstName": this.props.user.firstName,
      "lastName": this.props.user.lastName,
      "street1": this.props.user.address.street1,
      "street2": this.props.user.address.street2,
      "city": this.props.user.address.city,
      "state": this.props.user.address.state,
      "zipcode": this.props.user.address.zipcode
    };
    this.props.initialize(initData);
  }

  onSubmit(values) {
    //console.log(this);
    this.props.updateUser(values, ()=>{

      this.props.fetchUser(this.props.user.username);
    });
  }

  renderField(field) {
    //console.log(field);
    return(
      <TextField

        hintText={field.label}
        style={{margin: '5px'}}
        floatingLabelText={field.label}
        {...field}
      />
    );
  }

  render() {

    const { handleSubmit } = this.props;
    const { user } = this.props;

    if(!user) {
      return (

        <div>
          <RaisedButton label="Home Page" href={"http://127.0.0.1:8080"} />
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <div>
            <Field component={this.renderField} name="username" floatingLabelText="Username" disabled={true} />
            <Field component={this.renderField} name="email" floatingLabelText="Email" disabled={true} />
          </div>
          <div>
            <Field component={this.renderField} name="firstName" floatingLabelText="First Name" />
            <Field component={this.renderField} name="lastName" floatingLabelText="Last Name" />
          </div>
          <div>
            <Field component={this.renderField} name="street1" floatingLabelText="Street" />
            <Field component={this.renderField} name="city" floatingLabelText="City" />
          </div>
          <div>
            <Field component={this.renderField} name="street2" floatingLabelText="Apt/#" />
            <Field component={this.renderField} name="state" floatingLabelText="State" />
          </div>
          <div>
            <Field component={this.renderField} name="zipcode" floatingLabelText="Zipcode" />
          </div>
          <div>
            <RaisedButton type="submit" label="Update" primary={true} />
            <Link to={`/users`}>
              <RaisedButton style={{margin: '5px'}} label="Cancle" secondary={true}/>
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ users }, ownProps) {
  //console.log(ownProps);
  return { user: users[ownProps.match.params.username] };
}
//
// export default connect(mapStateToProps, { fetchUser : fetchUser })(UsersShow);


export default reduxForm({
  form: 'UpdateUserForm'
})(
  connect(mapStateToProps, { fetchUser : fetchUser, updateUser: updateUser})(UsersShow)
);
