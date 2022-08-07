import connection from '../database.js';

export async function getUser(req, res) {
    const email = res.locals.dados.email
    try{
      const {rows:user} = await connection.query(
    `SELECT users.id, users.name,
     SUM(urls."visitCount") AS "visitCount" 
     FROM users
     JOIN urls 
     ON users.id = urls."userId"
     GROUP BY urls."userId", users.id
     HAVING users.email= $1`,[email])
      if(!user.length) return res.sendStatus(401)
      const {rows:urls} = await connection.query(
      'SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId"=$1',[user[0].id])
      if(!urls.length) return res.sendStatus(404)
    const body = {
       id: user[0].id,
       name: user[0].name,
       visitCount: user[0].visitCount,
       shortenedUrls: urls
    }
        res.status(200).send(body);
      }catch(error){
        console.log(error)
        res.sendStatus(400)
      }
  
  }


export async function getRanking(req, res) {
    try{
      const {rows:ranking} = await connection.query(
   `SELECT users.id, users.name,
    COUNT(urls.id) AS "linksCount",
    COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
    FROM users
    LEFT JOIN urls
    ON users.id = urls."userId"
    GROUP BY urls."userId", users.id 
    ORDER BY "visitCount" DESC
    LIMIT 10`)
      res.status(200).send(ranking);
      }catch(error){
        console.log(error)
        res.sendStatus(400)
      }
  
}