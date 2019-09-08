/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import generateToken from '../utils/authService';
import User from '../models/User';

class UserController {
  static async createNewUser(req, res) {
    const {
      firstName, lastName, email, password, address, occupation, bio, expertise,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password.trim(), salt);

    try {
      const rows = await User.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: hash,
        address: address.trim(),
        occupation: occupation.trim(),
        bio: bio.trim(),
        expertise: expertise.trim(),
      });

      return res.status(201).json({
        status: 201,
        token: generateToken(rows[0].id),
        message: 'User created successfully',
        data: {
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
          address: rows[0].address,
          occupation: rows[0].occupation,
          bio: rows[0].bio,
          expertise: rows[0].expertise,
          role: rows[0].role,
          isAdmin: rows[0].is_admin,
          id: rows[0].id,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
  }

  static async authUser(req, res) {
    try {
      const rows = await User.findByEmail(req.body.email.trim());

      bcrypt.compare(req.body.password, rows[0].password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return res.status(200).json({
            status: 200,
            token: generateToken(rows[0].id),
            message: 'User is successfully logged in',
            data: {
              firstName: rows[0].first_name,
              lastName: rows[0].last_name,
              email: rows[0].email,
              address: rows[0].address,
              occupation: rows[0].occupation,
              bio: rows[0].bio,
              expertise: rows[0].expertise,
              isAdmin: rows[0].is_admin,
              role: rows[0].role,
              id: rows[0].id,
            },
          });
        }

        if (!isMatch) {
          return res.status(400).json({
            status: 400,
            error: 'Authentication failed, incorrect password!',
          });
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
  }

  static async changeRole(req, res) {
    const { userId } = req.params;

    try {
      const rows = await User.changeRole(userId);
      return res.status(200).json({
        status: '200',
        message: 'User account changed to mentor',
        data: rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
  }
}

export default UserController;
