import connection from '../database.js';
import  jwt  from 'jsonwebtoken';
import { nanoid } from 'nanoid'

export async function postUrl(req, res) {
  const url =  req.body.url
  const email = res.locals.dados.email
  console.log(email)
  const shortUrl = nanoid(5)
  try{
    const {rows:user} = await connection.query('SELECT * FROM users WHERE email=$1',[email])
    if(!user.length) return res.sendStatus(409)
    
    await connection.query('INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3)', [url, shortUrl, user[0].id ])
      res.status(201).send({shortUrl: shortUrl});
    }catch(error){
      res.sendStatus(400)
    }

}

export async function getUrlById(req, res) {
    const id =  req.params.id
    console.log(email)
    const shortUrl = nanoid(5)
    try{
      const {rows:user} = await connection.query('SELECT * FROM users WHERE email=$1',[email])
      if(!user.length) return res.sendStatus(409)
      
      await connection.query('INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3)', [url, shortUrl, user[0].id ])
        res.status(201).send({shortUrl: shortUrl});
      }catch(error){
        res.sendStatus(400)
      }
  
  }