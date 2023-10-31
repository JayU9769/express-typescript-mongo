import { DATABASE_URL } from '@config';
export const dbConnection = {
  url: DATABASE_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
