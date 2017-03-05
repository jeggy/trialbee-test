import {nodeDefinitions, fromGlobalId} from 'graphql-relay';

import User from './models/User';
import {getUser} from './loaders/UserLoader';
import UserType from './types/UserType';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'User') {
      console.log('AWEF');
      return getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType;
    }
    return null;
  }
);

export {nodeInterface,nodeField};
