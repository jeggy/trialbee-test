import {userConnection} from '../connection/UserConnection';
import {connectionArgs, connectionFromPromisedArray} from 'graphql-relay';
import { getUsers } from '../loaders/UserLoader';

export default {
  type: userConnection,
  args: connectionArgs,
  resolve: (_, args) => connectionFromPromisedArray(getUsers(args), args)
};
