import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'drokjvfuk',
      api_key: '498213851399385',
      api_secret: 'nWwsNepaKEXqvvx3XTv2GDpNbeA'
    });
  },
};
