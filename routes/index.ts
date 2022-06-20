import {  Router } from 'express';
import auth from './auth'
import users from './users'
import chart from './chart'

const routes = Router()
routes.get('/', (req, res) => {
    res.status(200).send({status: true, data: {}, message:"wellcome to Julia 🚀🚀🛰🛰"}).json();
  })
routes.use('/api/auth/', auth)
routes.use('/api/user/', users)
routes.use('/api/chart/', chart)

export default routes