import React from 'react';
import { Grid, Cell, DataTable, TableHeader} from 'react-mdl';
import Relay from 'react-relay';
import UserDialog from './UserDialogComponent';
import s from './User.scss';

class UsersListComponent extends React.Component {

  constructor(args){
    super(args);
  }

  static propTypes = {
    users: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
    rowSelected: React.PropTypes.func.isRequired,
    dialogShow: React.PropTypes.func.isRequired,
    show: React.PropTypes.any.isRequired
  };

  render() {
    return (
      <div>
        <DataTable
          selectable sortable shadow={2}
          className={s.table} rowKeyColumn="_id"
          rows={this.props.users.edges.map(u => u.node)}
          onSelectionChanged={this.props.rowSelected}
        >
          <TableHeader name="name">Name</TableHeader>
          <TableHeader name="address">Address</TableHeader>
          <TableHeader name="email">Email</TableHeader>
          <TableHeader numeric name="age">Age</TableHeader>
        </DataTable>
        {this.props.users.edges.map(edge => {
          return (
            <UserDialog key={edge.node._id} show={edge.node._id == this.props.show}
                        viewer={this.props.viewer}
                        handleState={state => {this.props.dialogShow(edge.node._id, state);}}
                        user={edge.node} />
          );
        })}
      </div>
    );
  }
}

export default Relay.createContainer(UsersListComponent, {
  fragments: {
    users: () => Relay.QL`      
      fragment on UserConnection{
        edges{
          node{
            id
            _id
            name
            address
            email
            age
          }
        }
      }
    `,
  },
});
