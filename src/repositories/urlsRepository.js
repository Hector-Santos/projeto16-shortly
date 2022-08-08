import connection from '../database.js';

async function insertUrl(url, shortUrl, userId) {
	return connection.query('INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3)', [url, shortUrl, userId ])
}

async function getUrlById(id) {
	return connection.query('SELECT * FROM urls WHERE id=$1',[id])
}

async function getUrl(shortUrl) {
	return connection.query('SELECT * FROM urls WHERE "shortUrl"=$1',[shortUrl])
}

async function updateVisitCount(shortUrl) {
	return connection.query('UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1',[shortUrl])
}

async function deleteUrl(id) {
	return connection.query('DELETE FROM urls WHERE "id"=$1', [id])
}

async function getUrlByUserId(id) {
	return connection.query(
        'SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId"=$1',[id])
}

export const urlsRepository = {
	insertUrl,
    getUrlById,
    getUrl,
    updateVisitCount,
    deleteUrl,
    getUrlByUserId
}