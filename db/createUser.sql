INSERT INTO helo_users
(username, hash, profile_img)
VALUES
($1, $2, $3)
RETURNING *;