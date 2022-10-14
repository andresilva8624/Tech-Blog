const router = require('express').Router();
const { Project, Comment, User } = require('../models/');

// get all Projects for homepage
router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [User],
    });

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('all-projects', { projects });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single Project
router.get('/Project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (projectData) {
      const project = projectData.get({ plain: true });

      res.render('single-project', { project });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;