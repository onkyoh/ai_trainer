import { factory, primaryKey } from '@mswjs/data';

const models = {
  plan: {
    _id: primaryKey(String),
    ownerId: String,
    name: String,
    plan: Array,
    tracker: {
      yAxis: String,
      points: Array
    },
    createdAt: Number,
  },
  user: {
    _id: primaryKey(String),
    username: String,
    password: String,
  },
};

export const db = factory(models)

export const loadDb = () => {
  Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'))
}

export const resetDb = () => {
  window.localStorage.clear();
};