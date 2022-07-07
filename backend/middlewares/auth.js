const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   throw new UnauthorizedError('Нужно авторизоваться');
  // }
  // console.log('jwt', req.cookies.jwt)
  // const token = authorization.replace('Bearer ', '');
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Нужно авторизоваться');
  }
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new UnauthorizedError('Неверный логин или пароль');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
