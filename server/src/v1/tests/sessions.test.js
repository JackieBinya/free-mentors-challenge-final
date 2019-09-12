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

  it('should not create a session if request is made by a mentor', async () => {
    const users = await User.create({ ...data.user00 });
    await User.updateRole(users[0].id);
    token = generateToken(users[0].id);
    session = data.session00;
    session.mentorId = users[0].id;
    const res = await exec();
    expect(res).to.have.status(403);
  });
});

describe('PATCH /api/v1/sessions/:sessionId/accept', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
    await pool.query('DELETE FROM sessions');
  });

  let sessionId = '';

  let token = '';

  const exec = () => request(app)
    .patch(`/api/v1/sessions/${sessionId}/accept`)
    .set('x-auth-token', token);


  it('should allow a mentor to accept a session request if session id is valid and mentor is authenticated', async () => {
    const users = await User.create({ ...data.user00 });

    await User.updateRole(users[0].id);

    token = generateToken(users[0].id);

    const rows = await User.create({ ...data.user18 });

    const { questions } = data.session00;

    const newSession = await Session.create({
      mentorId: users[0].id, mentee: rows[0].email, questions,
    });

    sessionId = newSession[0].id;

    const res = await exec();
    expect(res).to.have.status(200);
  });

  it('should not allow session request to be updated if mentor id is invalid', async () => {
    const users = await User.create({ ...data.user00 });
    token = generateToken(users[0].id);
    sessionId = 23000;
    const res = await exec();
    expect(res).to.have.status(403);
  });

  it('should not allow session request to be updated if session id is invalid type/format', async () => {
    const users = await User.create({ ...data.user00 });

    await User.updateRole(users[0].id);

    token = generateToken(users[0].id);

    sessionId = 'fifty';

    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should allow a mentor to accept a session request if session id is valid and mentor is authenticated', async () => {
    const users = await User.create({ ...data.user00 });

    await User.updateRole(users[0].id);

    token = generateToken(users[0].id);

    const rows = await User.create({ ...data.user18 });

    const { questions } = data.session00;

    const newSession = await Session.create({
      mentorId: users[0].id, mentee: rows[0].email, questions,
    });

    sessionId = newSession[0].id;

    const res = await exec();
    expect(res).to.have.status(200);
  });


  it('should not allow a mentor to accept a session twice', async () => {
    const users = await User.create({ ...data.user00 });

    await User.updateRole(users[0].id);

    token = generateToken(users[0].id);

    const rows = await User.create({ ...data.user18 });

    const { questions } = data.session00;

    const newSession = await Session.create({
      mentorId: users[0].id, mentee: rows[0].email, questions,
    });

    await Session.accept(newSession[0].id);

    sessionId = newSession[0].id;

    const res = await exec();

    expect(res).to.have.status(400);
  });
});

describe('PATCH /api/v1/sessions/:sessionId/reject', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM users');
    await pool.query('DELETE FROM sessions');
  });

  let sessionId = '';

  let token = '';

  const exec = () => request(app)
    .patch(`/api/v1/sessions/${sessionId}/reject`)
    .set('x-auth-token', token);


  it('should allow a mentor to decline a session request if session id is valid and mentor is authenticated', async () => {
    const users = await User.create({ ...data.user00 });

    await User.updateRole(users[0].id);

    token = generateToken(users[0].id);

    const rows = await User.create({ ...data.user18 });

    const { questions } = data.session00;

    const newSession = await Session.create({
      mentorId: users[0].id, mentee: rows[0].email, questions,
    });

    sessionId = newSession[0].id;

    const res = await exec();
    expect(res).to.have.status(200);
  });

  it('should not allow a mentor to reject a session more than once', async () => {
    const users = await User.create({ ...data.user00 });

    await User.updateRole(users[0].id);

    token = generateToken(users[0].id);

    const rows = await User.create({ ...data.user18 });

    const { questions } = data.session00;

    const newSession = await Session.create({
      mentorId: users[0].id, mentee: rows[0].email, questions,
    });

    await Session.decline(newSession[0].id);

    sessionId = newSession[0].id;

    const res = await exec();

    expect(res).to.have.status(400);
  });
});
