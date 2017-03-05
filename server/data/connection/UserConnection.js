import {connectionDefinitions} from 'graphql-relay';
import UserType from '../types/UserType';

/**
 * Define your own connection types here
 */
const {connectionType: userConnection, edgeType: userEdge } = connectionDefinitions({
  name: 'User',
  nodeType: UserType
});

export {userConnection, userEdge};
