import '../../../../env';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  const token = jwt.sign({
    payload: id,
  },
  process.env.JWT_PRIVATE_KEY);

  return token;
};

export default generateToken;