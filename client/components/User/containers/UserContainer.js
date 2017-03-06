import Relay from 'react-relay';
import User from '../UserComponent';
import UsersListContainer from './UsersListContainer';

export default Relay.createContainer(User, {
  initialVariables: {
    age: 0
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 20, age: $age) {
          ${UsersListContainer.getFragment('users')}
        }
      }`
    }
  }
);
