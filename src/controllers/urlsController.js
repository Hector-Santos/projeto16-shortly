import { nanoid } from 'nanoid'
import { urlsRepository } from '../repositories/urlsRepository.js'
import { userRepository } from '../repositories/usersRepository.js'


export async function postUrl(req, res) {
  const url =  req.body.url
  const email = res.locals.dados.email
  const shortUrl = nanoid(5)
  try{
    const {rows:user} = await userRepository.getUser(email)
    if(!user.length) return res.sendStatus(401)
    
    await urlsRepository.insertUrl(url, shortUrl, user[0].id)
      res.status(201).send({shortUrl: shortUrl});
    }catch(error){
      res.sendStatus(400)
    }

}

export async function getUrlById(req, res) {
    const id = req.params.id
    try{
      const {rows:url} = await urlsRepository.getUrlById(id)
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
      const {rows:url} = await urlsRepository.getUrl(shortUrl)
      if(!url.length) return res.sendStatus(404)
       await urlsRepository.updateVisitCount(shortUrl)
      res.redirect(url[0].url)
    }catch(error){
      console.log(error)
        res.sendStatus(400)
      }
  
  }

export async function deleteUrl(req, res) {
  const id =  req.params.id
  const email = res.locals.dados.email
  try{
    const {rows:user} = await userRepository.getUser(email)
    if(!user.length) return res.sendStatus(401)
    const {rows:url} = await urlsRepository.getUrlById(id)
    if(!url.length) return res.sendStatus(404)
    if (user[0].id !== url[0].userId){
      return res.sendStatus(401)
    }else{
      await urlsRepository.deleteUrl(id)
    }
      res.sendStatus(204);
    }catch(error){
      res.sendStatus(400)
    }

}

