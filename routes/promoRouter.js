const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());


promotionRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all promotions to you !!!");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the promotions :" +
        req.body.name +
        " with description :" +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported pn / promotions");
  })
  .delete((req, res, next) => {
    res.end("Deleted all promotions");
  });

//Getting by parameter the IDS


promotionRouter
  .route("/:promotionID")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("I'm sending promotion with id :"+ req.params.promotionID + " To you");
  })
  .post((req, res, next) => {
    res.end("POST operation is not suported /promotion: " + req.params.promotionID);
  })
  .put((req, res, next) => {
    res.write("Updating the promotion: " + req.params.promotionID + "\n");
    res.end(
      "Will update the promotion: " +
        req.body.name +
        " with description: " +
        req.body.description
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting promotion to id : " + req.params.promotionID);
  });
module.exports = promotionRouter