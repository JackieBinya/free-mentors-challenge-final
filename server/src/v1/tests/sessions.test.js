/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import pool from '../db/configDB';
import User from '../models/User';
import data from './MockData/user';
import '../../../../env';
import generateToken from '../utils/authService';
import Session from '../models/Session';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('POST /api/v1/sessions', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
    await pool.query('DELETE FROM sessions');
  });

  let session = {};

  let token = '';

  const exec = () => request(app)
    .post('/api/v1/sessions')
    .send(session)
    .set('x-auth-token', token);

  it('should not create a session if mentor is not provided or is invalid', async () => {
    const users = await User.create({ ...data.user00 });
    token = generateToken(users[0].id);
    session = data.session00;
    const res = await exec();
    expect(res).to.have.status(400);
  });
});

