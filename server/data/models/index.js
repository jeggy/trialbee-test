import sequelize from '../sequelize';
import User from './User';
import casual from 'casual';


function sync(...args){
  casual.seed(500);
  for(var i = 0; i < 10; i++){
    User.create({
      name: casual.full_name,
      email: casual.email,
      address: casual.address,
      age: casual.integer(15, 60)
    });
  }
  return sequelize.sync(...args);
}

export default { sync };
export { User };
