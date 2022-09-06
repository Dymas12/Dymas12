const express = require('express');
const bodyParser = require('body-parser');


const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all leaders to you !!!");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the leader :" +
        req.body.name +
        " with lastname :" +
        req.body.lastname
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported pn / leaders");
  })
  .delete((req, res, next) => {
    res.end("Deleted all leaders");
  });

//Getting by parameter the IDS


leaderRouter
  .route("/:leaderID")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("I'm sending leader with id :"+ req.params.leaderID + " To you");
  })
  .post((req, res, next) => {
    res.end("POST operation is not suported /leaders: " + req.params.leaderID);
  })
  .put((req, res, next) => {
    res.write("Updating the leader: " + req.params.leaderID + "\n");
    res.end(
      "Will update the leader: " +
        req.body.name +
        " with lastname: " +
        req.body.lastname
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting leader to id : " + req.params.leaderID);
  });

  module.exports = leaderRouter;