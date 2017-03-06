import Relay from 'react-relay';

class UpdateUserMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { updateUser }
    `;
  }

  getVariables() {
    return {
      id: this.props.id,
      name: this.props.name,
      address: this.props.address,
      email: this.props.email,
      age: this.props.age
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateUserPayload {
#        userEdge,
        viewer { users },
        updatedUser
      }
    `;
  }

  getOptimisticResponse(){
    return {
      story: {
        updatedUser: {
          id: this.props.id,
          name: this.props.name,
          address: this.props.address,
          email: this.props.email,
          age: this.props.age
        },
      },
    };
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {updatedUser: this.props.id}
    }];
  }
}

export default UpdateUserMutation;
