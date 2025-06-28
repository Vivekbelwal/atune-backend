import { Request, Response } from 'express';
import { UserDocument } from '~/user/user.schema';

declare global {
  interface Ctx {
    user?: UserDocument;
  }
}

export {};
