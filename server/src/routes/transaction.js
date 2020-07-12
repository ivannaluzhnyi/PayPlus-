const Router = require("express").Router;
const router = Router();

const {
    getAll,
    getOne,
    post,
    deleteTrns,
    update,
    getByMerchntsId,
} = require("../controllers/transaction.controller");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", post);
router.delete("/:id", deleteTrns);
router.put("/:id", update);
router.post("/mongo", getByMerchntsId);

module.exports = router;
