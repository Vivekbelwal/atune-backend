import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  SaveOptions,
} from 'mongoose';
import _ from 'lodash';

export class BaseService<
  T extends Document,
  C extends Record<string, any> = any,
> {
  Model: Model<T>;

  constructor(model: Model<T>) {
    this.Model = model;
  }

  findAll(query: FilterQuery<T>, options: QueryOptions = {}): Promise<T[]> {
    return this.Model.find(query, options).exec();
  }

  create(input: C, options: SaveOptions = {}): Promise<T> {
    this.removeNullValues(input);
    const newItem = new this.Model(input);
    return newItem.save(options);
  }

  removeNullValues(input: any, oldObj?: Document<T>) {
    _.forIn(input, (value, key) => {
      if (_.isNull(value)) {
        if (oldObj && !_.isNil(oldObj[key])) input[key] = undefined;
        else delete input[key];
      }
    });
  }
}
