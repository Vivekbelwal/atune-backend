import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import { BaseService } from '~/base/base.service';
import { Utils } from '~/common';

type CreateUserInput = {
  email: string;
  password: string;
  name: string;
};

type UpdateUserInput = {
  name?: string;
  avatarId?: string;
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

  async updateUser(userId: string, input: UpdateUserInput): Promise<Documents.User> {
    const updateData: any = {};

    if (input.name !== undefined) {
      updateData.name = input.name;
    }

    if (input.avatarId !== undefined) {
      updateData.avatarId = input.avatarId ? new Types.ObjectId(input.avatarId) : null;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }
}
