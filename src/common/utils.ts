import * as bcrypt from 'bcrypt';

function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

function validatePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export { hashPassword, validatePassword };
