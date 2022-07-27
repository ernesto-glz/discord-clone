import { transformDocument } from 'src/utils/utilts';

export const baseModelConfig = {
  toObject: { transform: transformDocument },
  toJSON: { transform: transformDocument }
};
