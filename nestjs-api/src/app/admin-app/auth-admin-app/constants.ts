import "dotenv/config"
export const jwtConstants = {
  //secret: 'secretKey',
  secret: process.env.JWT_SECRET,
};
