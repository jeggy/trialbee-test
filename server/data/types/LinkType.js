import {GraphQLObjectType, GraphQLString} from 'graphql';

export default new GraphQLObjectType({
  name: 'Link',
  fields: () => ({
    url: {
      type: GraphQLString
    },
    text: {
      type: GraphQLString
    },
  })
});
