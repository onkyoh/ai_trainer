import { factory, primaryKey } from '@mswjs/data';

const models = {
  plan: {
    _id: primaryKey(String),
    ownerId: String,
    name: String,
    plan: Array,
    tracker: {
      yAxis: String,
      points: Array,
    },
  },
  user: {
    _id: primaryKey(String),
    username: String,
    password: String,
  },
};

export let db = factory(models)

export const resetDb = () => {
  db = factory(models)
}