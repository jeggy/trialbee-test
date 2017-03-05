import {GraphQLObjectType, GraphQLString} from 'graphql';

export default new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    path: {
      type: GraphQLString
    },
    alt: {
      type: GraphQLString
    },
  })
});
