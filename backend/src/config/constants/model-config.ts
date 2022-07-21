import { transformDocument } from 'utils/utils';

export const baseModelConfig = {
  toObject: { transform: transformDocument },
  toJSON: { transform: transformDocument }
};
