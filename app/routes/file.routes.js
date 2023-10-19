module.exports = app => {
    const file_controller = require("../controller/file.controller");
    var router = require("express").Router();
    router.post("/upload", file_controller.uploadController);
    router.get("/:name", file_controller.displayAvatar);
    app.use("/api/file", router);
};