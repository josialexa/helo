SELECT p.id, u.id AS user_id, u.username AS author, u.profile_img, p.title, p.img, p.content FROM helo_post AS p
INNER JOIN helo_users AS u
ON u.id = p.author
WHERE p.id = $1;