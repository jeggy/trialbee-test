import Relay from 'react-relay';

class DeleteUserMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { deleteUser }
    `;
  }

  getVariables() {
    return {
      _id: this.props._id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteUserPayload {
        userEdge,
        viewer { users }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      pathToConnection: 'users',
      connectionName: 'users',
      deletedIDFieldName: 'deletedId',
    }];
  }
}

export default DeleteUserMutation;
