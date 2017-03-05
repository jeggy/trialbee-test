import {mutationWithClientMutationId, cursorForObjectInConnection, mutati, connectionFromPromisedArray} from 'graphql-relay';
import {GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLObjectType, GraphQLInt} from 'graphql';
import {tmpUser, deleteUser, getUsers} from '../loaders/UserLoader';
import ViewerType from '../types/ViewerType';
import {userEdge, userConnection} from '../connection/UserConnection';


export default mutationWithClientMutationId({
  name: 'DeleteUser',
  inputFields:{
    _id: {
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
      resolve: () => "TODO: return the id"
    }
  },

  mutateAndGetPayload: ({ _id }) => {
    // return await deleteUser(_id) == 1 ? tmpUser : null;
    return new Promise(async (resolve, reject) => {
      console.log(_id);
      if((await deleteUser(_id)) == 1)
        resolve(tmpUser);
      else
        reject('User not found');
    });
  }
});
