import { randomUUID } from 'crypto'
import { rest } from 'msw'
import { LOGIN_URL } from '../../../utils/constants'
import { db } from '../db'

interface ReqBody {
    username: string,
    password: string
}

export const authHandlers = [
    rest.post<ReqBody>(`${LOGIN_URL}/register`, async (req, res, ctx) => {

        const body = await req.json()
        const {username, password} = body
    
            if (!username || !password)  {
                return res(ctx.status(400), ctx.json({
                        success: false,
                        message: 'please fill all fields'
                }))
            }
        
            const user = db.user.findFirst({
                where: {
                    username: {
                        equals: username
                    }
                }
            })
        
            if (user) {
                return res(ctx.status(400), ctx.json({
                        success: false,
                        message: 'username taken'
                }))
            }
    
            return res(ctx.status(201), ctx.json({
                success: true,
                message: 'success',
                data: {
                    _id: randomUUID(),
                    username: username,
                    token: 'token123'
                }
            }))
    }),

    rest.post<ReqBody>(`${LOGIN_URL}/login`, async (req,res,ctx) => {

        const body = await req.json()
        const {username, password} = body

            if (!username || !password)  {
                return res(ctx.status(400), ctx.json({
                        success: false,
                        message: 'please fill all fields'
                }))
            }

            const user = db.user.findFirst({
                where: {
                    username: {
                        equals: username
                    }
                }
            })
        
            if (user?.password === password) {
                return res(ctx.status(201), ctx.json({
                success: true,
                message: 'success',
                data: {
                    _id: randomUUID(),
                    username: username,
                    token: 'token123'
                }
            }))
            } else {
                return res(ctx.status(400), ctx.json({
                    success: false,
                    message: 'invalid credentials',
                }))
            }    
     
    })   
]