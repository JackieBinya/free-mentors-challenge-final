/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../app';
import pool from '../db/configDB';
import User from '../models/User';
import data from './MockData/user';
import '../../../../env';
import generateToken from '../utils/authService';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('POST /api/v1/auth/signup', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
  });

  afterEach(async () => {
    await pool.query('DELETE FROM users');
  });

  let user = {};

  const exec = () => request(app)
    .post('/api/v1/auth/signup')
    .send(user);

  it('should not sign up a user if firstname field is not filled', async () => {
    user = { ...data.user01 };
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign up a user if lastname is invalid', async () => {
    user = { ...data.user02 };
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign up a user if email is invalid', async () => {
    user = { ...data.user03 };
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should authenticate a user when provided with the required details', async () => {
    user = { ...data.user00 };
    const res = await exec();
    expect(res).to.have.status(201);
  });

  it('should not sign up a user if password is invalid', async () => {
    user = { ...data.user04 };
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign up a user if address is invalid', async () => {
    user = { ...data.user05 };
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign up a user if occupation is invalid', async () => {
    user = { ...data.user06 };
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign up a user if bio is invalid', async () => {
    user = { ...data.user07 };
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign up a user if expertise is invalid', async () => {
    user = { ...data.user08 };
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign  up a user who is already registered', async () => {
    await User.create({ ...data.user00 });

    user = { ...data.user00 };
    const res = await exec();
    expect(res).to.have.status(400);
  });
});

describe('POST /api/v1/auth/signin', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
  });

  afterEach(async () => {
    await pool.query('DELETE FROM users');
  });

  const user = {};

  const exec = () => request(app)
    .post('/api/v1/auth/signin')
    .send(user);

  it('should not sign in a user who provides an invalid email', async () => {
    const { user00 } = data;
    user.email = '#';
    user.password = user00.password;

    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign in a user who provides an invalid password', async () => {
    const { user00 } = data;
    user.email = user00.email;
    user.password = 'x-men';

    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should sign in a user who provides all the required detail', async () => {
    const { user00 } = data;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user00.password, salt);

    await User.create({
      firstName: user00.firstName,
      lastName: user00.lastName,
      email: user00.email,
      password: hash,
      address: user00.address,
      occupation: user00.occupation,
      bio: user00.bio,
      expertise: user00.expertise,
    });

    user.email = user00.email;
    user.password = user00.password;

    const res = await exec();
    expect(res).to.have.status(200);
  });

  it('should not sign in a user who is not registered in the app', async () => {
    user.email = 'foo@bar.com';
    user.password = '123456b';

    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign in a user whose passwords mismatch', async () => {
    const { user00 } = data;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user00.password, salt);

    await User.create({
      firstName: user00.firstName,
      lastName: user00.lastName,
      email: user00.email,
      password: hash,
      address: user00.address,
      occupation: user00.occupation,
      bio: user00.bio,
      expertise: user00.expertise,
    });

    user.email = user00.email;
    user.password = 'foo';

    const res = await exec();
    expect(res).to.have.status(400);
  });
});


describe('PATCH /api/v1/user/:userId', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
  });

  afterEach(async () => {
    await pool.query('DELETE FROM users');
  });

  let userId = '';
  let token = '';

  const exec = () => request(app)
    .patch(`/api/v1/user/${userId}`)
    .set('x-auth-token', token);

  it('should not allow access to a admin without a token', async () => {
    userId = '404';
    token = '';
    const res = await exec();
    expect(res).to.have.status(401);
  });

  it('should not allow access to a admin with an invalid token', async () => {
    userId = '404';
    token = 'abcdef';
    const res = await exec();
    expect(res).to.have.status(401);
  });

  it('should not change roles if user id is not a number', async () => {
    const rows = await User.createAdmin({ ...data.admin });
    token = generateToken(rows[0].id);
    userId = 'twenty';
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not change roles of a non existant user', async () => {
    const rows = await User.createAdmin({ ...data.admin });
    token = generateToken(rows[0].id);
    userId = 2700;
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should only allow admins to change user roles', async () => {
    const { user00 } = data;
    const user = await User.create({ ...user00 });
    token = generateToken(user[0].id);
    userId = user[0].id;
    const res = await exec();
    expect(res).to.have.status(403);
  });

  it('should allow admin to change a user to a mentor if user is already a mentor', async () => {
    const { user00 } = data;
    const rows = await User.createAdmin({ ...data.admin });
    token = generateToken(rows[0].id);
    const users = await User.create({ ...user00 });
    await User.updateRole(users[0].id);
    userId = users[0].id;
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should allow admin to change a user to a mentor', async () => {
    const { user00 } = data;
    const rows = await User.createAdmin({ ...data.admin });
    token = generateToken(rows[0].id);
    const users = await User.create({ ...user00 });
    userId = users[0].id;
    const res = await exec();
    expect(res).to.have.status(200);
  });
});
