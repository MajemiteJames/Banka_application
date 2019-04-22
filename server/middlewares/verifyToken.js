import jwt from 'jsonwebtoken';

export default class Authorization {
  /**
   * @description method to protect routes and check for token in incoming requests
   * @param {Object} req The request object
   * @param {Object} res The resposnse object
   * @returns {Object} status code and message
   */
  static checkToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (token) {
      jwt.verify(token, 'iamaboy', (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            error: 'Token is invalid'
          });
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized! You must be logged in for that'
      });
    }
  }
}
