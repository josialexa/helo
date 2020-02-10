SELECT p.id, u.id AS user_id, u.username AS author, u.profile_img, p.title FROM helo_post AS p
INNER JOIN helo_users AS u
ON u.id = p.author
WHERE u.id != $1
AND p.title LIKE $2;