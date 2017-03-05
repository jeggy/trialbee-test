import Relay from 'react-relay';
import User from './UserComponent';
import UsersListComponent from './UsersListComponent';

export default Relay.createContainer(
  User, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          id,
          users(first: 20) {
            ${UsersListComponent.getFragment('users')}
          }
        }`
    }
  }
);
