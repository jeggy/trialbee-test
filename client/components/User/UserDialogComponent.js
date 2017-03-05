import React from 'react';
import Relay from 'react-relay';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Textfield} from 'react-mdl';
import AddUserMutation from './AddUserMutation';

export default class UserDialog extends React.Component {

  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    handleState: React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object.isRequired,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    if(props.user && props.user._id){
      this.state = props.user;
    }else{
      this.state = {_id: '', name: '', address: '', email: '', age: ''};
    }

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);

    this.ocName = this.ocName.bind(this);
    this.ocAddress = this.ocAddress.bind(this);
    this.ocEmail = this.ocEmail.bind(this);
    this.ocAge = this.ocAge.bind(this);
  }

  set(k, v){
    let state = {};
    state[k] = v;
    this.setState(state);
  }

  handleOpenDialog() {
    this.props.handleState(true);
  }

  handleCloseDialog() {
    this.props.handleState(false);
  }

  handleCreateUser() {
    console.log(this.state);
    Relay.Store.commitUpdate(
      new AddUserMutation({
        name: this.state.name,
        address: this.state.address,
        email: this.state.email,
        age: this.state.age
      }), {
        onSuccess: () => {
          this.props.handleState(false);
          this.resetInput();
        },
        onFailure: (t) => {
          console.log(t.getError());
        }
      }
    );
  }

  handleUpdateUser(){
    console.log(this.state);
    console.log('Update user not implement on frontend yet.');
  }

  resetInput(){
    this.set('name', '');
    this.set('address', '');
    this.set('email', '');
    this.set('age', '');
  }

  ocName(e){
    this.set('name', e.target.value);
  }
  ocAddress(e){
    this.set('address', e.target.value);
  }
  ocEmail(e){
    this.set('email', e.target.value);
  }
  ocAge(e){
    this.set('age', e.target.value);
  }

  render() {
    return (
      <Dialog open={this.props.show} style={{width: '400px'}}>
        <DialogTitle>{this.state._id ? 'Edit \'' + this.state.name +'\'' : 'Add new user'}</DialogTitle>
        <DialogContent>
          <div>
            <Textfield
              floatingLabel
              onChange={this.ocName}
              label="Name"
              ref="name"
              style={{width: '400px'}}
              value={this.state.name}
              required
            />
            <Textfield
              floatingLabel
              onChange={this.ocAddress}
              label="Address"
              style={{width: '400px'}}
              value={this.state.address}
            />
            <Textfield
              floatingLabel
              onChange={this.ocEmail}
              label="Email"
              pattern='\S+@\S+\.\S+'
              error="Not a valid email address"
              style={{width: '400px'}}
              value={this.state.email}
              required
            />
            <Textfield
              floatingLabel
              onChange={this.ocAge}
              label="Age"
              pattern="-?[0-9]*(\.[0-9]+)?"
              error="Age can only be a number!"
              style={{width: '400px'}}
              value={this.state.age}
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type='button' onClick={this.state._id ? this.handleUpdateUser : this.handleCreateUser}>{ this.state._id ? 'Update' : 'Create'}</Button>
          <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
