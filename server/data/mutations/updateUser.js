import {mutationWithClientMutationId, cursorForObjectInConnection, fromGlobalId} from 'graphql-relay';
import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {updateUser, getUsers, tmpUser} from '../loaders/UserLoader';
import {userEdge} from '../connection/UserConnection';
import ViewerType from '../types/ViewerType';
import UserType from '../types/UserType';


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
    },
    updatedUser: {
      type: UserType,
      resolve: async u => await u
    }
  },

  mutateAndGetPayload: async ({ id: sentId, name, address, email, age }) =>
    new Promise((resolve, reject) => {
      const { id } = fromGlobalId(sentId);

      let update = {id};
      if(name)update.name = name;
      if(address)update.address = address;
      if(email)update.email = email;
      if(age)update.age = age;

      updateUser(update).then(updatedUser => {
        if(updatedUser) resolve(updatedUser);
        else reject('User not found')
      }).catch(e => reject(e.errors.map(e => e.path+': '+e.type)));
    })
});
