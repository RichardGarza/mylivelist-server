"use strict";
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    "Store",
    {
      userId: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {}
  );
  Store.associate = function(models) {
    Store.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };

  Store.addScope("allStoresFor", userId => {
    return {
      where: { userId },
      order: [["createdAt", "DESC"]]
    };
  });

  return Store;
};
