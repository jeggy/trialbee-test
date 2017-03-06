import {mutationWithClientMutationId, cursorForObjectInConnection, mutati, connectionFromPromisedArray, fromGlobalId} from 'graphql-relay';
import {GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLObjectType, GraphQLInt} from 'graphql';
import {tmpUser, deleteUser, getUsers} from '../loaders/UserLoader';
import ViewerType from '../types/ViewerType';
import {userEdge, userConnection} from '../connection/UserConnection';


export default mutationWithClientMutationId({
  name: 'DeleteUser',
  inputFields:{
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },

  outputFields: {
    userEdge: {
      type: userEdge,
      resolve: async(obj) => {
        const cursorId = cursorForObjectInConnection(await getUsers(), obj);
        return {node: obj, cursor: cursorId};
      },
    },
    viewer: {
      type: ViewerType,
      resolve: () => tmpUser
    },
    users: {
      type: userConnection,
      resolve: () => connectionFromPromisedArray(getUsers())
    },
    deletedId: {
      type: GraphQLString,
      resolve: (test, test2, test3) => {
        console.log(test);
        console.log(test2);
        console.log(test3);
        return "TODO: return the id";
      }
    }
  },

  mutateAndGetPayload: ({ id: sentId }) => {
    return new Promise(async (resolve, reject) => {
      console.log('Deleting');
      const {type, id } = fromGlobalId(sentId);
      if((await deleteUser(id)) == 1)
        resolve(tmpUser);
      else
        reject('User not found');
    });
  }
});
