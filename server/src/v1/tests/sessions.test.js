/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../models/User';
import data from './MockData/user';
import '../../../../env';
import generateToken from '../utils/authService';
import Session from '../models/Session';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('POST /api/v1/sessions', () => {
  beforeEach(() => {
    User.remove();
    Session.remove();
  });

  let session = {};

  let token = '';

  const exec = () => request(app)
    .post('/api/v1/sessions')
    .send(session)
    .set('x-auth-token', token);

  it('should not create a session if mentor is not provided or is invalid', async () => {
    const user = User.create({ ...data.user00 });
    token = generateToken(user.id);
    session = data.session00;
    const res = await exec();

    expect(res).to.have.status(400);
  });
});

describe('PATCH /api/v1/sessions/:sessionId/reject', () => {
  beforeEach(() => {
    User.remove();
    Session.remove();
  });

  let sessionId = '';

  let token = '';

  const exec = () => request(app)
    .patch(`/api/v1/sessions/${sessionId}/reject`)
    .set('x-auth-token', token);

  it('should not decline a session if session id is invalid', async () => {
    const user = User.create({ ...data.user00 });
    User.changeRole(user.id);
    token = generateToken(user.id);
    sessionId = 23;
    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not allow a mentor to reject a session twice', async () => {
    const { id: mentorId } = User.create({ ...data.user00 });
    User.changeRole(mentorId);
    token = generateToken(mentorId);

    const { id: menteeId } = User.create({ ...data.user18 });

    const { questions } = data.session00;
    const newSession = Session.create({ mentorId, menteeId, questions });

    newSession.status = 'Rejected';

    sessionId = newSession.id;

    const res = await exec();
    expect(res).to.have.status(400);
  });

  it('should not allow session request to be updated if mentor id is invalid', async () => {
    const user = User.create({ ...data.user00 });
    token = generateToken(user.id);
    sessionId = 23;
    const res = await exec();
    expect(res).to.have.status(403);
  });

  it('should allow a mentor to reject a session request if session id is valid and mentor is authenticated', async () => {
    const { id: mentorId } = User.create({ ...data.user00 });
    User.changeRole(mentorId);
    token = generateToken(mentorId);

    const { id: menteeId } = User.create({ ...data.user18 });

    const { questions } = data.session00;
    const newSession = Session.create({ mentorId, menteeId, questions });

    sessionId = newSession.id;
    const res = await exec();
    expect(res).to.have.status(200);
  });
});

describe('PATCH /api/v1/sessions/:sessionId/accept', () => {
  beforeEach(() => {
    User.remove();
    Session.remove();
  });

  let sessionId = '';

  let token = '';

  const exec = () => request(app)
    .patch(`/api/v1/sessions/${sessionId}/accept`)
    .set('x-auth-token', token);


  it('should allow a mentor to accept a session request if session id is valid and mentor is authenticated', async () => {
    const { id: mentorId } = User.create({ ...data.user00 });
    User.changeRole(mentorId);
    token = generateToken(mentorId);

    const { id: menteeId } = User.create({ ...data.user18 });

    const { questions } = data.session00;
    const newSession = Session.create({ mentorId, menteeId, questions });

    sessionId = newSession.id;
    const res = await exec();
    expect(res).to.have.status(200);
  });

  it('should not allow a mentor to accept a session twice', async () => {
    const { id: mentorId } = User.create({ ...data.user00 });
    User.changeRole(mentorId);
    token = generateToken(mentorId);

    const { id: menteeId } = User.create({ ...data.user18 });

    const { questions } = data.session00;
    const newSession = Session.create({ mentorId, menteeId, questions });
    newSession.status = 'Accepted';

    sessionId = newSession.id;

    const res = await exec();
    expect(res).to.have.status(400);
  });
});

describe('GET /api/v1/sessions', () => {
  beforeEach(() => {
    User.remove();
    Session.remove();
  });

  let token = '';

  const exec = () => request(app)
    .get('/api/v1/sessions')
    .set('x-auth-token', token);

  it('should not get  a mentee sessions if they dont exist', async () => {
    const { id: menteeId } = User.create({ ...data.user18 });
    token = generateToken(menteeId);
    const res = await exec();
    expect(res).to.have.status(404);
  });

  it('should not get  a mentor sessions if they dont exist', async () => {
    const { id: mentorId } = User.create({ ...data.user18 });
    User.changeRole(mentorId);
    token = generateToken(mentorId);
    const res = await exec();
    expect(res).to.have.status(404);
  });

  it('should not get a mentee sessions if they dont exist', async () => {
    const { id: mentorId } = User.create({ ...data.user00 });
    User.changeRole(mentorId);
    const { id: menteeId } = User.create({ ...data.user18 });
    token = generateToken(1);
    const { questions } = data.session00;
    Session.create({ mentorId, menteeId, questions });

    const res = await exec();
    expect(res).to.have.status(403);
  });

  it('should get a mentee sessions if they exist', async () => {
    const { id: mentorId } = User.create({ ...data.user00 });
    User.changeRole(mentorId);
    const { id: menteeId } = User.create({ ...data.user18 });
    token = generateToken(menteeId);
    const { questions } = data.session00;
    Session.create({ mentorId, menteeId, questions });

    const res = await exec();
    expect(res).to.have.status(200);
  });

  it('should get a mentor sessions if they exist', async () => {
    const { id: mentorId } = User.create({ ...data.user00 });
    User.changeRole(mentorId);
    token = generateToken(mentorId);
    const { id: menteeId } = User.create({ ...data.user18 });
    const { questions } = data.session00;
    Session.create({ mentorId, menteeId, questions });

    const res = await exec();
    expect(res).to.have.status(200);
  });
});
