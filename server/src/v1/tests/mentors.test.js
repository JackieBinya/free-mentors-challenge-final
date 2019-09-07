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

describe('GET /api/v1/mentors', () => {
  beforeEach(() => {
    User.remove();
  });

  let token = '';

  const exec = () => request(app)
    .get('/api/v1/mentors')
    .set('x-auth-token', token);

  it('should not get mentors if the user has no token', async () => {
    token = '';
    const res = await exec();
    expect(res).to.have.status(401);
  });

  it('should not get mentors if the user has an invalid token', async () => {
    token = 'code';
    const res = await exec();
    expect(res).to.have.status(401);
  });

  it('should notify a user if there are no mentors registered in the app', async () => {
    const user = User.create({ ...data.user00 });
    token = generateToken(user.id);
    const res = await exec();
    expect(res).to.have.status(404);
  });

  it('should get mentors in the app if the user is authenticated', async () => {
    const user = User.create({ ...data.user00 });
    token = generateToken(user.id);
    User.changeRole(user.id);

    const res = await exec();
    expect(res).to.have.status(200);
  });
});

describe('GET /api/v1/mentors:mentorId', () => {
  beforeEach(() => {
    User.remove();
  });

  let token = '';
  let mentorId = '';

  const exec = () => request(app)
    .get(`/api/v1/mentors/${mentorId}`)
    .set('x-auth-token', token);

  it('should not fetch a specific mentor if the user has no token', async () => {
    const user = User.create({ ...data.user00 });
    const mentor = User.changeRole(user.id);
    token = '';
    mentorId = mentor.id;
    const res = await exec();
    expect(res).to.have.status(401);
  });

  it('should not fetch a specific mentor if the user has an invalid token', async () => {
    const user = User.create({ ...data.user00 });
    const mentor = User.changeRole(user.id);
    token = 'yes';
    mentorId = mentor.id;
    const res = await exec();
    expect(res).to.have.status(401);
  });

  it('should notify a user if the mentor does not exist', async () => {
    const user = User.create({ ...data.user00 });
    token = generateToken(user.id);
    mentorId = '5';
    const res = await exec();
    expect(res).to.have.status(404);
  });

  it('should fectch a specific mentor in the app if the user is authenticated', async () => {
    const user = User.create({ ...data.user00 });
    token = generateToken(user.id);
    User.changeRole(user.id);
    mentorId = user.id;

    const res = await exec();
    expect(res).to.have.status(200);
  });
});
