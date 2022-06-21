import {  Router } from 'express';
import chatRout from '../../controllers/chart'
import isAuth from '../../middleware/isAuth';

const user = Router()
user.use(isAuth)
user.get('/', chatRout.getChat)
user.post('/', chatRout.addChat)

export default user