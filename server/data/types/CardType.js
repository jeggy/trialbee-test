import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';
import LinkType from './LinkType';
import ImageType from './ImageType';
import {globalIdField} from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'Card',
  fields: () => ({
    id: globalIdField('Card'),
    title: {
      type: GraphQLString,
    },
    image: {
      type: ImageType
    },
    link: {
      type: LinkType
    },
    text: {
      type: GraphQLString
    },
  })
});

