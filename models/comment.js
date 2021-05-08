'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      models.Like.belongsTo(models.User, 
        { foreignKey: {
          allowNull: false
         
        }, onDelete:'CASCADE',
      }),
        models.Like.belongsTo(models.Post, 
          { foreignKey: {
            allowNull: false,
               
          }, onDelete:'CASCADE',
        })
    }
  };
  Comment.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};