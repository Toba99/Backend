import {  Router } from 'express';
import userRout from '../../controllers/users'
import isAuth from '../../middleware/isAuth';

const user = Router()
user.use(isAuth)
user.post('/update-avater', userRout.avatar_base_64)
user.get('/logout', userRout.logout)

export default user