import { urlsRepository } from "../repositories/urlsRepository.js"
import { userRepository } from "../repositories/usersRepository.js"

export async function getUser(req, res) {
    const email = res.locals.dados.email
    try{
      const {rows:user} = await userRepository.getUserStats(email)
      if(!user.length) return res.sendStatus(401)
      const {rows:urls} = await urlsRepository.getUrlByUserId(user[0].id)
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
      const {rows:ranking} = await userRepository.getRanking()
      res.status(200).send(ranking);
      }catch(error){
        console.log(error)
        res.sendStatus(400)
      }
  
}