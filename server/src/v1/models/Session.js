import uuid from 'uuid';
import User from './User';

class Session {
  constructor() {
    this.sessions = [];
  }

  create(data) {
    const { mentorId, menteeId, questions } = data;
    const { email: menteeEmail } = User.findOne(menteeId);
    const newSession = {
      id: uuid.v4(),
      mentorId,
      menteeId,
      questions,
      menteeEmail,
      status: 'Pending',
    };
    this.sessions.push(newSession);
    return newSession;
  }

  decline(id) {
    const session = this.sessions.find(sessionItem => sessionItem.id === id);
    const index = this.sessions.indexOf(session);
    this.sessions[index].status = 'Rejected';

    return this.sessions[index];
  }

  accept(id) {
    const session = this.sessions.find(sessionItem => sessionItem.id === id);
    const index = this.sessions.indexOf(session);
    this.sessions[index].status = 'Accepted';

    return this.sessions[index];
  }

  findOne(id) {
    return this.sessions.find(session => session.id === id);
  }

  findMenteeSessions(id) {
    return this.sessions.filter(session => session.menteeId === id);
  }

  findMentorSessions(id) {
    return this.sessions.filter(session => session.mentorId === id);
  }

  remove() {
    this.sessions = [];
  }
}

export default new Session();
