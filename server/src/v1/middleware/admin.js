import bcrypt from 'bcryptjs';
import '../../../../env';
import User from '../models/User';

class Admin {
  static createAdmin(req, res, next) {
    const user = User.findAdmin();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt);
    if (!user) {
      User.createAdmin({
        firstName: 'admin',
        lastName: 'admin',
        email: process.env.ADMIN_EMAIL,
        password: hash,
        address: '4 De Wet Terraces, Goodwood',
        occupation: 'Administrator',
        bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development',
        expertise: 'Javascript, React, Angular, Python',
      });
    }
    next();
  }
}

export default Admin;
