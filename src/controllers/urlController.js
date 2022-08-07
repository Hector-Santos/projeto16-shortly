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
    const id = req.params.id
    try{
      const {rows:url} = await connection.query('SELECT * FROM urls WHERE id=$1',[id])
      if(!url.length) return res.sendStatus(404)
        res.status(200).send({
            id: id,
	        shortUrl: url[0].shortUrl,
	        url: url[0].url
      })
    }catch(error){
        res.sendStatus(400)
      }
  
  }

  export async function openUrl(req, res) {
    const shortUrl = req.params.shortUrl
    try{
      const {rows:url} = await connection.query('SELECT * FROM urls WHERE "shortUrl"=$1',[shortUrl])
      if(!url.length) return res.sendStatus(404)
       await connection.query('UPDATE urls SET accesses = accesses + 1 WHERE "shortUrl"=$1',[shortUrl])
      res.redirect(url[0].url)
    }catch(error){
        console.log(error)
        res.sendStatus(400)
      }
  
  }