'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      models.Post.belongsTo(models.User,{
        foreignKey:{
          allowNull:false
        }, onDelete:'CASCADE',
      })
      models.Post.hasMany(models.Comment)
      
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};