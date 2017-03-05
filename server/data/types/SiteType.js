import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';
import {globalIdField} from 'graphql-relay';
import {GraphQLList} from '../../../node_modules/graphql/type/definition';
import CardType from './CardType';

const UserType = new GraphQLObjectType({
  name: 'Site',
  fields: () => ({
    title:{
      type: GraphQLString
    },
    about: {
      type: GraphQLString
    },
    cards: {
      type: new GraphQLList(CardType),
    }
  })
});

export default UserType;
