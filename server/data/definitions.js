import {nodeDefinitions, fromGlobalId} from 'graphql-relay';

import User from './models/User';
import {getUser, tmpUser} from './loaders/UserLoader';
import UserType from './types/UserType';
import ViewerType from './types/ViewerType';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type){
      case 'User':
        return await getUser(id);
      case 'Viewer':
        return tmpUser;
      default:
        return null;
    }
  },
  (obj) => {
    if (obj instanceof User.Instance) {
      return UserType;
    }
    // TODO:
    return ViewerType;
  }
);

export {nodeInterface, nodeField};
