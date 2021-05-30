'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      models.Comment.belongsTo(models.User, 
        { foreignKey: {
          allowNull: false
         
        }, onDelete:'CASCADE',
      }),
        models.Comment.belongsTo(models.Post, 
          { foreignKey: {
            allowNull: false,
               
          }, onDelete:'CASCADE',
        })
    }
  };
  Comment.init({
    id: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,   
    createdAt: DataTypes.NOW,
    updateAt: DataTypes.NOW
    
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};