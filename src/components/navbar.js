import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import { TextField } from 'redux-form-material-ui'
import DatePicker from 'material-ui/DatePicker';


/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */

class Navbar extends Component {


  state = {
    logged: false,
    showLoginForm: false,
  };

  handleOpen = () => {
    this.setState({showLoginForm: true});
    console.log(state.showLoginForm);
  };

  handleClose = () => {
    this.setState({showLoginForm: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <AppBar
          title="MyApp"
          iconElementRight={this.state.logged ? <Logged /> :
            <div>
              <FlatButton label="Login" onTouchTap={this.handleOpen}/>
              <Dialog
                title="Dialog With Date Picker"
                actions={actions}
                modal={false}
                open={this.state.showLoginForm}
                onRequestClose={this.handleClose}
              >
                Open a Date Picker dialog from within a dialog.
                <DatePicker hintText="Date Picker" />
              </Dialog>
            </div>}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { logged: state.logged, showLoginForm: state.showLoginForm };
}

export default connect(mapStateToProps, null)(Navbar);
