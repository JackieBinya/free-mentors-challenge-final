import pool from './configDB';

const queryText = `
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users
`;
pool.query(queryText)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
