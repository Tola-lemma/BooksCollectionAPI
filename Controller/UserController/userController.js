const db = require('../../Database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const saltRounds = 10;
exports.CreateUser = async (req, res) => {
      const { username,email,role,password } = req.body;
      if (!username ||!role||!email ||!password ) {
        return res.status(404).send({ message: "Mandatory Fields cannot be Empty!" });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Invalid email address" });
       }
        // Validate username
  if (!/^[a-zA-Z0-9_-]{3,10}$/.test(username)) {
      return res.status(400).send({ message: "Invalid username. Must be 3-10 characters long and can only contain letters, numbers, underscores, or hyphens." });
       }
 // Validate password
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
      return res.status(400).send({
        message: "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
      });
    }
      try {
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = await db.query(
          'INSERT INTO users (username, email, role, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email,role',
          [username, email, role, hash]
        );
    
        const user = newUser.rows[0];
        jwt.sign(
          { id: user.id ,username: user.username, role:user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' },
          (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, message: 'User Created Successfully and email sent to user.' , user })
          }
        );
      } catch (err) {
        res.status(500).json({ message: 'Error while creating User', error: err.message });
      }
    };

exports.UserLogin = async (req, res) => {
      const { email, password } = req.body;
    
      try {
        const foundUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (foundUser.rows.length === 0) {
          return res.status(401).json('Invalid credentials.');
        }
    
        const user = foundUser.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (isMatch) {
          jwt.sign(
            { id: user.id ,username: user.username,role:user.role,email:user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({ token,message:"You are Logged in  Successfully!", user});
            }
          );
        } else {
          res.status(401).json('Invalid credentials.');
        }
      } catch (error) {
        res.status(500).json('Internal server error.' || error.message);
      }
    };