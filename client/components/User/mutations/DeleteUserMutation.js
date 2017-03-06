import Relay from 'react-relay';

class DeleteUserMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { deleteUser }
    `;
  }

  getVariables() {
    return {
      id: this.props.id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteUserPayload {
        deletedId,
        viewer { users }
      }
    `;
  }

  getConfigs() {
    console.log(this.props);
    console.log('getConfigs -DeleteUserMutation');
    return [{
      type: 'RANGE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'users',
      deletedIDFieldName: 'deletedId',
      pathToConnection: ['viewer', 'users'],
    }];
  }
}

export default DeleteUserMutation;
