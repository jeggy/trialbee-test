import DataType from 'sequelize';
import Model from '../sequelize';


const User = Model.define('User', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING,
    allowNull: false
  },

  address: {
    type: DataType.STRING
  },

  email: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail:true
    }
  },

  age: {
    type: DataType.INTEGER,
    allowNull: false
  },

}, {

  indexes: [
    { fields: ['age'] },
    { unique: true, fields: ['email'] }
  ],

});

export default User;
