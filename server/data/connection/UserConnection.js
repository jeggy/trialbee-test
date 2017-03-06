import {connectionDefinitions} from 'graphql-relay';
import UserType from '../types/UserType';

const {connectionType: userConnection, edgeType: userEdge } = connectionDefinitions({
  name: 'User',
  nodeType: UserType
});

export {userConnection, userEdge};
