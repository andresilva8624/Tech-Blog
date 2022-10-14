const router = require('express').Router();
const { Project } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const ProjectData = await Project.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const Projects = ProjectData.map((Project) => Project.get({ plain: true }));

    res.render('all-Projects-admin', {
      layout: 'dashboard',
      Projects,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-Project', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const ProjectData = await Project.findByPk(req.params.id);

    if (ProjectData) {
      const Project = ProjectData.get({ plain: true });

      res.render('edit-Project', {
        layout: 'dashboard',
        Project,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;