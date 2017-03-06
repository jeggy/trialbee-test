import {mutationWithClientMutationId, cursorForObjectInConnection, fromGlobalId} from 'graphql-relay';
import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {updateUser, getUsers, tmpUser} from '../loaders/UserLoader';
import {userEdge} from '../connection/UserConnection';
import ViewerType from '../types/ViewerType';


export default mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
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

  mutateAndGetPayload: async ({ id: sentId, name, address, email, age }) => {
    const { id } = fromGlobalId(sentId);
    await updateUser({dbId, name, address, email, age});
  }
});
