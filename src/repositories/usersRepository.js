import connection from '../database.js';

async function getUser(email) {
	return connection.query('SELECT * FROM users WHERE email=$1', [email]);
}

async function insertUser(name, email, password) {
	return connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)', [name, email, password])
}

async function getUserStats(email) {
	return connection.query(
		`SELECT users.id, users.name,
		 SUM(urls."visitCount") AS "visitCount" 
		 FROM users
		 JOIN urls 
		 ON users.id = urls."userId"
		 GROUP BY urls."userId", users.id
		 HAVING users.email= $1`,[email])
}

async function getRanking(email) {
	return connection.query(
		`SELECT users.id, users.name,
		 COUNT(urls.id) AS "linksCount",
		 COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
		 FROM users
		 LEFT JOIN urls
		 ON users.id = urls."userId"
		 GROUP BY urls."userId", users.id 
		 ORDER BY "visitCount" DESC
		 LIMIT 10`)
}


export const userRepository = {
	getUser,
    insertUser,
	getUserStats,
	getRanking
}