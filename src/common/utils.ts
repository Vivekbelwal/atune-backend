import * as crypto from 'crypto';

function hashPassword(password: string) {
  // TODO: Use env variable
  return crypto.createHmac('sha256', 'salt').update(password).digest('hex');
}

export { hashPassword };
