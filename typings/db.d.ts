import { Document, Types } from 'mongoose';

declare global {
  interface BaseDocument<T = Types.ObjectId> extends Document<T> {
    _id: Types.ObjectId;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface ArraySubdocument extends Omit<Types.ArraySubdocument<undefined>, '_id' | 'id'> {}
  interface ArraySubdocumentWithId extends Types.ArraySubdocument<Types.ObjectId> {
    _id: Types.ObjectId;
    id: string;
  }

  interface Subdocument extends Omit<Types.Subdocument<undefined>, '_id' | 'id'> {}
  interface SubdocumentWithId extends Types.Subdocument<Types.ObjectId> {
    _id: Types.ObjectId;
    id: string;
  }

  type StringOrId = Types.ObjectId | string;
}
