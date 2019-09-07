import uuid from 'uuid';

class User {
  constructor() {
    this.users = [];
  }

  create(data) {
    const {
      firstName, lastName, email, address, password, occupation, bio, expertise,
    } = data;
    const newUser = {
      firstName,
      lastName,
      email,
      address,
      password,
      occupation,
      bio,
      expertise,
      imageUrl: '',
      isAdmin: false,
      role: 'user',
      id: uuid.v4(),
    };
    this.users.push(newUser);
    return newUser;
  }

  createAdmin(data) {
    const {
      firstName, lastName, email, address, password, occupation, bio, expertise,
    } = data;
    const newUser = {
      firstName,
      lastName,
      email,
      address,
      password,
      occupation,
      bio,
      expertise,
      imageUrl: '',
      isAdmin: true,
      role: '',
      id: uuid.v4(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findAdmin() {
    return this.users.find(user => user.isAdmin === 'true');
  }

  findOne(id) {
    return this.users.find(user => user.id === id);
  }

  changeRole(id) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users[index].role = 'mentor';
    return this.users[index];
  }

  findMentors() {
    return this.users.filter(user => user.role === 'mentor');
  }

  remove() {
    this.users = [];
  }
}

export default new User();
