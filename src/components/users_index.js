import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../actions';
import _ from 'lodash';

import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

class UsersIndex extends React.Component {

  state = {
    fixedHeader: true,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: true,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '500px',
    term: ''
  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  handelSearchChange = (event) => {
    this.setState({term: event.target.value});
  }

  componentDidMount() {
    this.props.fetchUsers();
    //console.log(this.props);
  }
  renderUsers() {
    //console.log(this.props.users);
    //console.log(this);
    return _.map(this.props.users, user => {
      if(user.username.includes(this.state.term) || this.state.term==='') {
        return (
          <TableRow key={user.username}>
            <TableRowColumn><Link to={`/users/${user.username}`}>{user._id}</Link></TableRowColumn>
            <TableRowColumn>{user.username}</TableRowColumn>
            <TableRowColumn>{user.email}</TableRowColumn>
          </TableRow>
        );
      }
    });
  }

  render() {
    return(
        <div>
        <TextField fullWidth={true} hintText={"Search..."} onChange={this.handelSearchChange}/>
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow
                displayRowCheckbox={this.state.showCheckboxes}

              >
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Username</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.renderUsers()}
            </TableBody>
          </Table>
          <RaisedButton label="Add User" primary={true} href={"http://127.0.0.1:8080/users/new"} />
        </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return { users: state.users };
}

export default connect(mapStateToProps, { fetchUsers: fetchUsers })(UsersIndex);
