import mongoose, { FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class Repository<T> {
  protected constructor(protected readonly entityModel: Model<T> & mongoose.PaginateModel<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projection
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  async findById(id: string): Promise<T | null> {
    return this.entityModel.findById(id);
  }

  async findByIdAndDelete(id: string): Promise<T | null> {
    return await this.entityModel.findByIdAndDelete(id);
  }

  async updateOne(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<T>
  ): Promise<boolean> {
    const result = await this.entityModel.updateOne(entityFilterQuery, updateEntityData);
    return !!result.modifiedCount;
  }

  async updateMany(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<T>) {
    const result = await this.entityModel.updateMany(entityFilterQuery, updateEntityData);
    return !!result.modifiedCount;
  }

  async findOneAndSelect(entityFilterQuery: FilterQuery<T>, value: string) {
    return this.entityModel.findOne(entityFilterQuery).select(value);
  }

  async create(createEntityData: unknown): Promise<T> {
    return await this.entityModel.create(createEntityData);
  }

  async paginate(entityFilterQuery: FilterQuery<T>, options?: object) {
    return await this.entityModel.paginate(entityFilterQuery, options);
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>) {
    return await this.entityModel.deleteMany(entityFilterQuery);
  }

  async findAndPopulate(
    entityFilterQuery: FilterQuery<T>,
    populateItem: string,
    populateItemTwo?: string
  ): Promise<T[] | null> {
    if (populateItemTwo) {
      return this.entityModel
        .find(entityFilterQuery)
        .populate(populateItem)
        .populate(populateItemTwo);
    }
    return this.entityModel.find(entityFilterQuery).populate(populateItem);
  }

  async findOneAndPopulate(
    entityFilterQuery: FilterQuery<T>,
    populateItem: string,
    populateItemTwo?: string
  ) {
    if (populateItemTwo) {
      return this.entityModel
        .findOne(entityFilterQuery)
        .populate(populateItem)
        .populate(populateItemTwo);
    }

    return this.entityModel.findOne(entityFilterQuery).populate(populateItem);
  }

  async countDocuments(entityFilterQuery: FilterQuery<T>) {
    return this.entityModel.countDocuments(entityFilterQuery);
  }
}
