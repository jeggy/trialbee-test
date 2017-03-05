import Sequelize from 'sequelize';

const sequelize = new Sequelize('database',null,null, {
  dialect: 'sqlite',
  storage: 'database.sqlite'
});


export default sequelize;
