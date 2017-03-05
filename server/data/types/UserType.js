import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';
import {globalIdField} from 'graphql-relay';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: GraphQLString,
    },
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
  })
});

export default UserType;
