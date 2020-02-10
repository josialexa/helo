CREATE TABLE helo_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  hash VARCHAR(20),
  profile_img TEXT
);

--Change column type for password hash for helo_usersfrom VARCHAR(20) to TEXT
ALTER TABLE helo_users
ALTER COLUMN hash TYPE TEXT;

CREATE TABLE helo_post (
  id SERIAL PRIMARY KEY,
  author INTEGER REFERENCES helo_users(id),
  title TEXT
);

--Add content column to helo_post for post content
ALTER TABLE helo_post
ADD COLUMN content TEXT;

--Add image column to helo_post for post image
ALTER TABLE helo_post
ADD COLUMN img TEXT;