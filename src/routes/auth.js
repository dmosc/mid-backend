import { Router } from 'express';
import { compareSync, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Mediator } from '@db/models';
import { secret } from '@config/environment';
import { defaultExpiresIn } from '@utils/constants';

const auth = Router();

auth.post('/register', async (req, res) => {
  try {
    const mediator = new Mediator({
      ...req.body,
      password: hashSync(req.body.password, 10),
      email: req.body.email.toLowerCase().trim(),
      phones: [{ countryCode: 52, number: '3320814167' }],
    });

    await mediator.save();

    return res.status(200).json({
      token: jwt.sign({ id: mediator.id }, secret, { expiresIn: defaultExpiresIn }),
    });
  } catch (e) {
    return res.status(500).json(e);
  }
});

auth.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const mediator = await Mediator.findOne({ email });

    if (!mediator || !compareSync(password, mediator.password)) {
      return res.status(401).json({
        message: 'Login failed',
        eor: "Email and password don't match",
      });
    }

    return res.status(200).json({
      token: jwt.sign({ id: mediator.id }, secret, { expiresIn: defaultExpiresIn }),
    });
  } catch (e) {
    return res.status(500).json(e);
  }
});

auth.post('/logout', async (req, res) => {
  try {
    return res.status(200).send('OK');
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default auth;
