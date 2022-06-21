import {  Router } from 'express';
import auth from './auth'
import users from './users'
import chat from './chat'

const routes = Router()
routes.get('/', (req, res) => {
    res.status(200).send({status: true, data: {}, message:"wellcome to Julia 🚀🚀🛰🛰"}).json();
  })
routes.use('/api/auth/', auth)
routes.use('/api/user/', users)
routes.use('/api/chat/', chat)

export default routes