import {mutationWithClientMutationId, cursorForObjectInConnection} from 'graphql-relay';
import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {getUser, addUser, getUsers, tmpUser} from '../loaders/UserLoader';
import {userEdge} from '../connection/UserConnection';
import ViewerType from '../types/ViewerType';
import UserType from '../types/UserType';


const addUserMutation = mutationWithClientMutationId({
  name: 'AddUser',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    address: {
      type: GraphQLString
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },

  outputFields: {
    userEdge: {
      type: userEdge,
      resolve: async (obj) => {
        const cursorId = cursorForObjectInConnection(await getUsers(), obj);
        return { node: obj, cursor: cursorId };
      }
    },
    viewer: {
      type: ViewerType,
      resolve: () => tmpUser
    }
  },

  mutateAndGetPayload: async ({ name, address, email, age }) => await addUser(
    {name: name, address: address, email: email, age: age})
});

export default addUserMutation;
