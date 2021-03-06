import moment from 'moment';
import db from '../db';
import Helper from '../helpers/helper';
import "@babel/polyfill";

const User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async create(req, res) {

    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      newuser(firstName, lastName, email, password, isAdmin, createdAt)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashPassword,
      'false',
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({
        status: 201,
        data: [{
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
        }],
        message: 'User registered successfully'
      });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 
          status: 400,
          error: error.message
         });
      }

      return res.status(400).send({
        error: error.message,
        status: 400
      });
    }
  },
  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  async login(req, res) {

    const text = 'SELECT * FROM newuser WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(403).send({
          status: 403,
          message: 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(403).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({
         status: 201,
         data: [{
           token,
           id: rows[0].id,
           email: rows[0].email,
         }],
         message: 'Login successful'
         });
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(200).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default User;