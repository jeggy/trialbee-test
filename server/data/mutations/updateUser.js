import {mutationWithClientMutationId, cursorForObjectInConnection} from 'graphql-relay';
import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {updateUser, getUsers, tmpUser} from '../loaders/UserLoader';
import {userEdge} from '../connection/UserConnection';
import ViewerType from '../types/ViewerType';


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
        const cursorId = cursorForObjectInConnection(await getUsers(obj), obj);
        return { node: obj, cursor: cursorId };
      }
    },
    viewer: {
      type: ViewerType,
      resolve: () => tmpUser
    }
  },

  mutateAndGetPayload: async ({ id, name, address, email, age }) => await updateUser(
    {id, name, address, email, age})
});

export default addUserMutation;
