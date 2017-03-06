import Relay from 'react-relay';
import UsersListComponent from '../UsersListComponent';


export default Relay.createContainer(UsersListComponent, {
  fragments: {
    users: () => Relay.QL`
      fragment on UserConnection{
        edges{
          node{
            id
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
