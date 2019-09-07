/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../app';
import User from '../models/User';
import data from './MockData/user';
import '../../../../env';
import generateToken from '../utils/authService';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('POST /api/v1/auth/signup', () => {
  beforeEach(() => {
    User.remove();
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

  it('should not sign up a user if lastname field is not filled', async () => {
    user = { ...data.user02 };
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not sign up a user if email field is not filled', async () => {
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
    const user1 = User.create({ ...data.user00 });

    user = { ...data.user00 };
    const res = await exec();
    expect(res).to.have.status(400);
  });
});

describe('POST /api/v1/auth/signin', () => {
  beforeEach(() => {
    User.remove();
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

    User.create({
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

    User.create({
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
  beforeEach(() => {
    User.remove();
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

  it('should not change roles of a non existant user', async () => {
    User.createAdmin({ ...data.admin });
    const admin = User.findByEmail(process.env.ADMIN_EMAIL);
    token = generateToken(admin.id);
    userId = 27;
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should only allow admins to change user roles', async () => {
    const { user00 } = data;
    const user = User.create({ ...user00 });
    token = generateToken(user.id);
    userId = user.id;
    const res = await exec();
    expect(res).to.have.status(403);
  });

  it('should allow admin to change a user to a mentor', async () => {
    const { user00 } = data;
    const user = User.create({ ...user00 });
    userId = user.id;
    User.createAdmin({ ...data.admin });
    const admin = User.findByEmail(process.env.ADMIN_EMAIL);
    token = generateToken(admin.id);
    const res = await exec();
    expect(res).to.have.status(200);
  });
});
