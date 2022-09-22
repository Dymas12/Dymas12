const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Favorites = require("../models/favorites");
const favoriteRouter = express.Router();
var authenticate = require("../authenticate");
const cors = require("./cors");
favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .all(authenticate.verifyUser)
  .get((req, res, next) => {
    var userId = req.user.id;
    console.log(userId, "userId");
    Favorites.find({
      user: userId,
    })
      .populate("user")
      .populate("dishes")
      .exec((error, dish) => {
        if (error) {
          next(error);
        }
        res.json(dish);
      });
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Favorites.find({})
      .populate("user")
      .populate("dishes")
      .then((favorites) => {
        var userId = req.user.id;
        var user;
        var data = req.body
        if (favorites)
          user = favorites.filter((e) => e.user._id.toString() === userId)[0];
        if (!user) {
          user = new Favorites({ user: userId });
        }
        for (let i of data) {
          if (
            user.dishes.find((dish_id) => {
              if (dish_id._id) {
                return dish_id._id.toString() === i._id.toString();
              }
            })
          )
            continue;
          user.dishes.push(i._id);
        }
        user
          .save()
          .then(
            (userFavorits) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(userFavorits);
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    var userId = req.user.id;
    console.log(userId);
    Favorites.remove(
      {
        User: userId,
      },
      (error, data) => {
        if (error) {
          next(error);
        }
        res.json(data);
      }
    );
  });

favoriteRouter
  .route("/:dishId")
  .all(authenticate.verifyUser)
  .delete((req, res, next) => {
    var userId = req.user.id;
    console.log(userId);
    var dishId = req.params.dishId;
    console.log(dishId);
    Favorites.findOne(
      {
        User: userId,
      },
      (error, favorites) => {
        if (error) {
          next(error);
        }
        for (var i = favorites.dishes.length - 1; i >= 0; i--) {
          if (favorites.dishes[i] == dishId) {
            favorites.dishes.splice(i, 1);
          }
        }
        favorites.save((error, favoriteDish) => {
          if (error) {
            next(error);
          }
          console.log(favoriteDish);
          res.json(favoriteDish);
        });
      }
    );
  });

module.exports = favoriteRouter;
