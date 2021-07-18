// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reward } = initSchema(schema);

export {
  Reward
};