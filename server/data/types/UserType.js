import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';
import {globalIdField} from 'graphql-relay';
import {nodeInterface} from '../definitions';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    // _id: {
    //   type: GraphQLString,
    // },
    name: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }),
  interfaces: () => [nodeInterface]
});

export default UserType;


