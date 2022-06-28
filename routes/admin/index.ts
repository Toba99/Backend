import {  Router } from 'express';
import adminRout from '../../controllers/admin'
import isAuth from '../../middleware/isAuth';
import isAdmin from '../../middleware/isAdmin';

const admin = Router()
admin.use(isAuth)
admin.use(isAdmin)
admin.get('/all-user', adminRout.users)
admin.get('/user-chat/:id', adminRout.usersChat)

export default admin