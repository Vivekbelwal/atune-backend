import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { BaseService } from '~/base/base.service';
import { Utils } from '~/common';

type CreateUserInput = {
  email: string;
  password: string;
  name: string;
};

@Injectable()
export class UserService extends BaseService<Documents.User, CreateUserInput> {
  constructor(@InjectModel(User.name) private userModel: Model<Documents.User>) {
    super(userModel);
  }

  create(input: CreateUserInput) {
    const hashPassword = Utils.hashPassword(input.password);
    return super.create({ ...input, password: hashPassword });
  }
}
