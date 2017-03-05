/* eslint-disable global-require */
import React from 'react';
import { Button, Checkbox } from 'react-mdl';
import Page from '../Page/PageComponent';
import AddUser from './AddUserComponent';
import styles from './User.scss';
import DeleteUserMutation from './DeleteUserMutation';
import Relay from 'react-relay';
import UsersListComponent from './UsersListComponent';


export default class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: [],
      overAge: false,
      currentDialog: false
    };
  }
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  deleteSelected(){
    this.state.selected.forEach(function(id) {
      Relay.Store.commitUpdate(
        new DeleteUserMutation({
          _id: id,
        }), {
          onSuccess: () => {
            console.log('Deleted!');
          },
          onFailure: (t) => {
            console.log('Failed');
            console.log(t.getError());
          }
        }
      );
    });
  }

  toggleOverAge(){
    this.setState({overAge: !this.state.overAge});
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
          <Button raised accent ripple onClick={() => this.deleteSelected()}>Delete</Button>
          &nbsp;&nbsp;{c}
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
            onChange={() => this.toggleOverAge()}
            label={'Only show people over the age 30'} />
          <UsersListComponent
            users={this.props.viewer.users}
            viewer={this.props.viewer}
            selected={this.state.selected}
            rowSelected={selected => {this.setState({selected});}}
            show={this.state.currentDialog}
            dialogShow={(id, state) => {this.setState({currentDialog: state ? id : false})}}
            />
        </Page>
      </div>
    );
  }
}
