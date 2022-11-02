const router = require('express').Router();
const { Project } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll({
      where: {
        userId: req.session.user_id,
      },
    });

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('all-projects-admin', {
      layout: 'dashboard',
      projects,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-project', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);

    if (projectData) {
      const project = projectData.get({ plain: true });

      res.render('edit-project', {
        layout: 'dashboard',
        project,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;