import pool from './configDB';

const queryText = `
CREATE TABLE IF NOT EXISTS
users(
  id BIGSERIAL,
  first_name VARCHAR(128) NOT NULL,
  last_name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  address VARCHAR(200) NOT NULL,
  occupation VARCHAR(128) NOT NULL,
  bio VARCHAR(800) NOT NULL,
  expertise VARCHAR(200) NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  role VARCHAR(20) DEFAULT 'user',
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
  );
CREATE TABLE IF NOT EXISTS
sessions(
  id SERIAL,
  mentor_id BIGINT,
  mentee_email VARCHAR(128) NOT NULL ,
  questions VARCHAR(200) NOT NULL ,
  status VARCHAR(50) DEFAULT 'Pending',
  created_on  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (mentee_email) REFERENCES users(email) ON DELETE CASCADE,
  FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE CASCADE
  )
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
