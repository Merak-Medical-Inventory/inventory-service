import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../ErrorHandler';

export const jwtSign = async (payload: any) => {
  const options: any = {
    algorithm: process.env.JWT_OPTIONS_ALGORITHM || '',
    expiresIn: process.env.JWT_OPTIONS_EXPIRESIN,
    issuer: process.env.JWT_OPTIONS_ISSUER,
    audience: process.env.JWT_OPTIONS_AUDIENCE
  }
  let privateKey = process.env.JWT_PRIVATE_KEY || ''
  if (privateKey) privateKey = privateKey.replace(/\\n/g, '\n')
  return jwt.sign(payload, privateKey, options);
};

export const jwtVerify = async (token: any) => {
  try {
    let publicKey = process.env.JWT_PUBLIC_KEY || ''
    if (publicKey) publicKey = publicKey.replace(/\\n/g, '\n')
    return jwt.verify(token, publicKey);
  } catch (error) {
    throw new ErrorHandler(401, 'UNAUTHORIZED');
  }
};

export const jwtDecode = async (token: string) => {
  return jwt.decode(token, { json: true });
};