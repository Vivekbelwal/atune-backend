import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserInput } from './user.input';
import { BaseService } from '~/base/base.service';
import { Utils } from '~/common';

@Injectable()
export class UserService extends BaseService<Documents.User, CreateUserInput> {
  constructor(@InjectModel(User.name) private userModel: Model<Documents.User>) {
    super(userModel);
  }

  create(input: CreateUserInput) {
    return this.create({ ...input, password: Utils.hashPassword(input.password) });
  }
}
