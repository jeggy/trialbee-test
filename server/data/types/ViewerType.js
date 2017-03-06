import {GraphQLObjectType, GraphQLInt} from 'graphql';
import {globalIdField, connectionArgs, connectionFromPromisedArray} from 'graphql-relay';
import {userConnection} from '../connection/UserConnection';
import { getUsers } from '../loaders/UserLoader';
import {nodeInterface} from '../definitions';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    users: {
      type: userConnection,
      args: {
        ...connectionArgs,
        age: {
          type: GraphQLInt
        }
      },
      resolve: (_, args) => connectionFromPromisedArray(getUsers(args), args)
    }
  }),
  interfaces: () => [nodeInterface]
});
