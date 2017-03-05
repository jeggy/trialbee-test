import sequelize from '../data/sequelize';
import User from '../data/models/User';
import casual from 'casual';

sequelize.sync({force: true}).then(function () {
  User.create({
    name: 'Jógvan Olsen',
    email: 'jo@jebster.net',
    address: 'Bystævneparken 19, 4 407, Copenhagen Denmark',
    age: 22
  });
  casual.seed(1000);
  for(var i = 0; i < 25; i++){
    User.create({
      name: casual.full_name,
      email: casual.email,
      address: casual.address,
      age: casual.integer(15, 60)
    });
  }
});

