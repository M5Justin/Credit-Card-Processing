const router = require('express').Router();
const { User } = require('../../models');
<<<<<<< HEAD

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

=======
>>>>>>> e64883e0b0a9cab7ec212c8323bd0f71003fab30
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    const validPassword = user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;