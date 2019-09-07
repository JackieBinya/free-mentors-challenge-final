/* eslint-disable consistent-return */
import { emailRE, passwordRE, nameRE } from '../utils/regex';

class Validators {
  static signUpValidator(req, res, next) {
    const {
      firstName, lastName, email, password, address, occupation, bio, expertise,
    } = req.body;
    if (!firstName || firstName.trim() === '' || !nameRE.test(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid firstname',
      });
    }

    if (!lastName || lastName.trim() === '' || !nameRE.test(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid lastname',
      });
    }

    if (!email || email.trim() === '' || !emailRE.test(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email',
      });
    }

    if (!password || password.trim() === '' || !passwordRE.test(password)) {
      return res.status(400).json({
        status: 400,
        error: 'A password should consists letters and numbers and have a minimum of 6 characters.',
      });
    }

    if (!address || address.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid address',
      });
    }

    if (!occupation || occupation.trim() === '' || occupation.trim().length > 100) {
      return res.status(400).json({
        status: 400,
        error: 'Occupation should be no more than 100 characters long.',
      });
    }

    if (!bio || bio.trim() === '' || bio.trim().length < 30 || bio.trim().length > 800) {
      return res.status(400).json({
        status: 400,
        error: 'A vaild bio should be between 30 and 800 characters.',
      });
    }

    if (!expertise || expertise.trim() === '' || expertise.trim().length < 30 || expertise.trim().length > 200) {
      return res.status(400).json({
        status: 400,
        error: 'Area of expertise should be between 30 and 200 characters',
      });
    }

    next();
  }

  static loginValidator(req, res, next) {
    const { email, password } = req.body;

    if (!email || email.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email',
      });
    }

    if (!password || password.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid password',
      });
    }
    next();
  }
}

export default Validators;
