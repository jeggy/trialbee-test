import User from '../models/User';

const tmpUser = {
  id: 'some-tmp-id',
  _id: 'some-tmp-id',
  name: 'Temp Person',
  address: 'At some place',
  email: 'tmp@mail.com',
  age: 30
};

function getUser(id) {
  return tmpUser; // User.find({where: {id: id}});
}

function getUsers(search) {
  let options = {where: {}};
  if(search && search.name)
    options.where.name = { $regex: new RegExp(`^${search.name}`, 'ig') };
  if(search && search.age)
    options.where.age = {gt: search.age};

  return User.findAll(options);
}

function addUser(user) {
  return User.create(user)
}

// TODO: implement this
function updateUser(user) {
  return user;
}

function deleteUser(id) {
  return User.destroy({where: {id: id}});
}

export {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  tmpUser
};
