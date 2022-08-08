import  jwt  from 'jsonwebtoken';
import  {userRepository}  from '../repositories/usersRepository.js';

export async function signUp(req, res) {
    const user = req.body
    try{
      const {rows:repetido} = await userRepository.getUser(user.email)
      if(repetido.length) return res.sendStatus(409)
    await userRepository.insertUser(user.name, user.email, user.password)
      res.sendStatus(201);
    }catch(error){
      res.sendStatus(400)
    }
}

export async function signIn(req, res) {
  const user = req.body
  try{
    const {rows:login} = await userRepository.getUser(user.email)
    if(!login.length || user.password !== login[0].password) return res.sendStatus(401)
    const dados = { email: user.email };
    const chaveSecreta = process.env.JWT_SECRET;
    const token = jwt.sign(dados, chaveSecreta)
    res.status(201).send(token);
  }catch(error){
    res.sendStatus(400)
  }
}
