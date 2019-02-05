import express from 'express';
import connection from './config';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    title: 'Express'
  });
});

// GET ALL TASKS BY DATE ASC
router.get('/api/tasks', (req, res) => {
  connection.query('SELECT id, date, todo, priority, status, name, surname, email, password FROM tasks INNER JOIN users ON tasks.user_id = users.id_user ORDER BY date ASC', (err, results) => {
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
  const email = req.body.email;
  const password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      res.status(500).send('Username e password non corrispondenti');
    } else {
      res.json(results);
    }
  });
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
