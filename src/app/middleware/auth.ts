import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import { StatusCodes } from 'http-status-codes'
import { TUserRole } from '../module/user/user.interface'

const auth = (...userRoles: TUserRole[]) => {
  return catchAsync((req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization?.split(' ')?.[1]
    if (!bearerToken) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You have no access to this route',
      )
    }

    const decoded = jwt.verify(
      bearerToken,
      process.env.JWT_ACCESS_SECRET as string,
    )

    if (!decoded) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You have no access to this route',
      )
    }

    if (
      userRoles?.length &&
      !userRoles.includes((decoded as JwtPayload).role)
    ) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You have no access to this route',
      )
    }

    req.user = decoded as JwtPayload
    // console.log(user)

    next()
  })
}

export default auth
