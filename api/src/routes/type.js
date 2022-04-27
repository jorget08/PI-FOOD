const { Router } = require('express');
const router = Router();
const { Type } = require('../db');

router.get("/", async (req, res, next) => {
    try{
        const types = await Type.findAll()
        res.status(200).json(types)
    }
    catch(err){
        next(err)
    }
})

module.exports = router;
