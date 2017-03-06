/* eslint-disable global-require */
import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, Slider } from 'react-mdl';
import Page from '../Page/PageComponent';
import AddUser from './AddUserComponent';
import styles from './User.scss';
import DeleteUserMutation from './mutations/DeleteUserMutation';
import Relay from 'react-relay';
import UsersListComponent from './containers/UsersListContainer';


export default class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: [],
      overAge: false,
      currentDialog: false,
      warningDialog: false
    };
  }
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  deleteSelected(){
    const viewerId = this.props.viewer.id;

    this.state.selected.forEach(function(id) {
      Relay.Store.commitUpdate(
        new DeleteUserMutation({
          id: id,
          viewerId: viewerId
        }), {
          onSuccess: (deletedUser) => {
            console.log('User deleted!');
          },
          onFailure: (t) => {
            console.log('Failed');
            console.log(t.getError());
          }
        }
      );
    });
  }

  toggleOverAge(checked){
    this.props.relay.setVariables({age: checked ? 30 : 0});
  }

  headingLeft(){
    let c = '';
    if(this.state.selected.length == 1){
      c = (
        <Button colored raised ripple className={styles.whiteText}
                onClick={() => this.setState({currentDialog: this.state.selected[0]})}>Edit</Button>
      );
    }
    if(this.state.selected.length > 0){

      c = (
        <span className={styles.besideHeaderSmall}>
          {this.state.selected.length} Selected&nbsp;&nbsp;&nbsp;
          <Button raised accent ripple onClick={() => this.setState({warningDialog: true})}>Delete</Button>
          &nbsp;&nbsp;{c}

          <Dialog open={this.state.warningDialog}>
          <DialogTitle>Delete {this.state.selected.length > 1 ? 'users' : 'user'}?</DialogTitle>
          <DialogContent>
            <p>You sure you want to delete {this.state.selected.length} users?.</p>
          </DialogContent>
          <DialogActions>
            <Button raised accent ripple type='button'
                    onClick={() => {
                      this.setState({warningDialog: false});
                      this.deleteSelected();}
                    }>Delete</Button>
            <Button raised type='button'
                    onClick={() =>
                      this.setState({warningDialog: false})
                    }>Cancel</Button>
          </DialogActions>
        </Dialog>
        </span>
      );
    }

    return c;
  }

  render() {

    return (
      <div>
        <Page heading='Users' headingLeft={this.headingLeft()} headingRight={<AddUser viewer={this.props.viewer} />}>
          <Checkbox
            value={this.state.overAge}
            onChange={(e) => this.toggleOverAge(e.target.checked)}
            label={'Only show people over the age 30'} />
          <UsersListComponent
            users={this.props.viewer.users}
            viewer={this.props.viewer}
            selected={this.state.selected}
            rowSelected={selected => this.setState({selected})}
            show={this.state.currentDialog}
            dialogShow={(id, state) => {this.setState({currentDialog: state ? id : false})}}
            />
        </Page>
      </div>
    );
  }
};
