const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');

Project.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Project.hasMany(Comment, {
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comment,
  Project
};