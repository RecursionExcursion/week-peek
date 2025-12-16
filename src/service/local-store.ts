import { createZipStore } from '../lib/zip-store';
import { User } from '../weekPeek/types';

type ZipStoreSchema = {
  user: User;
  test: {
    test: string;
  };
};

export const zipStore = createZipStore<ZipStoreSchema>();
