import {  Router } from 'express';
import authRout from '../../controllers/auth'

const auth = Router()
auth.post('/login', authRout.login)
auth.post('/register', authRout.register)
auth.post('/send-reset-password-token', authRout.preForgot)
auth.post('/reset-password', authRout.postForgot)

export default auth