import React from 'react';
import Relay from 'react-relay';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Textfield, Snackbar } from 'react-mdl';
import AddUserMutation from './mutations/AddUserMutation';
import UpdateUserMutation from './mutations/UpdateUserMutation';

export default class UserDialog extends React.Component {

  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    handleState: React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object.isRequired,
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    if(props.user && props.user.id){
      this.state = props.user;
    }else{
      this.state = {id: '', name: '', address: '', email: '', age: ''};
    }

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.ocName = this.ocName.bind(this);
    this.ocAddress = this.ocAddress.bind(this);
    this.ocEmail = this.ocEmail.bind(this);
    this.ocAge = this.ocAge.bind(this);

    this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
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

  handleSave(update) {
    let MutationType = update ? UpdateUserMutation : AddUserMutation;
    Relay.Store.commitUpdate(
      new MutationType({
        viewerId: this.props.viewer.id,
        id: this.state.id,
        name: this.state.name,
        address: this.state.address,
        email: this.state.email,
        age: this.state.age
      }), {
        onSuccess: () => {
          this.props.handleState(false);
          console.log(this.state.id);
          if(!this.state.id) this.resetInput();
        },
        onFailure: (t) => {
          this.handleShowSnackbar();
          this.setState({message: t.getError().source.errors[0].message});
        }
      }
    );
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

  handleShowSnackbar() {
    this.setState({ isSnackbarActive: true });
  }


  render() {
    return (
      <Dialog open={this.props.show} style={{width: '400px'}}>
        <DialogTitle>{this.state.id ? 'Edit \'' + this.state.name +'\'' : 'Add new user'}</DialogTitle>
        <DialogContent>
          <div>
            <Snackbar
              active={!!this.state.isSnackbarActive}
              onTimeout={() => this.setState({ isSnackbarActive: false })}>
                {this.state.message}
            </Snackbar>
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
          <Button type='button' onClick={() => this.handleSave(!!this.state.id)}>
            { this.state.id ? 'Update' : 'Create'}
            </Button>
          <Button type='button' onClick={this.handleCloseDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
