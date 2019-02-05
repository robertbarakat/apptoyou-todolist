import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import connection from './config';

const router = express.Router();

// Passport setting for authentification based on email and password
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
}, (email, password, done) => {
  try {
    connection.query('SELECT * FROM users WHERE email=?', email, (err, results) => {
      if (err) {
        return done(err, false);
      }
      const user = results[0]; // means user = row[0] of the db
      if (!user) { // if user doesn't exist return false
        return done(null, false);
      }
      const authPassword = bcrypt.compareSync(password, user.password);
      if (!authPassword) { // if password doesn't match return false
        return done(null, false);
      }
      return done(null, user); // if everything matches return user (which equals row[0])
    });
  } catch (e) {
    console.log('err', e);
  }
}));

// Jason Web Token
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secretpwd',
}, (jwtPayload, cb) => cb(null, jwtPayload)
));

// GET ALL TASKS BY DATE ASC ACCORDING TO USER ID
router.get('/api/tasks/:id', (req, res) => {
  const idUser = req.params.id;
  connection.query('SELECT id, date, todo, priority, status, name, surname FROM tasks INNER JOIN users ON tasks.user_id = users.id_user WHERE users.id_user=? ORDER BY date ASC', idUser, (err, results) => {
    if (err) {
      res.status(500).send('Errore nel recupero dei dati');
    } else {
      res.json(results);
    }
  });
});

// SIGNUP TO CREATE USER
router.post('/api/signup', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO users SET ?', formData, (err) => {
    if (err) {
      res.status(500).send('Errore nella creazione dell\'utenza');
    } else {
      res.sendStatus(200);
    }
  });
});

// SIGNIN
router.post('/api/signin', (req, res) => {
  passport.authenticate('local', (err, data) => {
    if (err) {
      return res.status(500);
    }
    if (!data) {
      return res.status(400);
    }
    const { password, ...user } = data;
    const token = jwt.sign(user, 'secretpwd');
    return res.json({ user, token });
  })(req, res);
});

// CREATE TO DO
router.post('/api/todo/create', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO tasks SET ?', formData, (err) => {
    if (err) {
      res.status(500).send('Errore nella creazione del To Do');
    } else {
      res.sendStatus(200);
    }
  });
});

export default router;
