/* eslint-disable no-unused-vars, no-use-before-define */
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { tmpUser } from './loaders/UserLoader';
import { nodeField } from './definitions';
import ViewerType from './types/ViewerType';
import addUser from './mutations/addUser';
import deleteUser from './mutations/deleteUser';
import site from './queries/site';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    viewer: {
      type: ViewerType,
      resolve: () => tmpUser
    },
    site
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser,
    deleteUser,
  }
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
