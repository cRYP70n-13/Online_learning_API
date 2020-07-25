const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({success: true, message: "Show all the bootcamps"});
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({success: true, message: `show the bootcamp ${req.params.id}`});
})
router.post('/', (req, res, next) => {
    res.status(200).json({success: true, message: `Create a new bootcamp`});
});

router.put('/:id', (req, res, next) => {
    res.status(200).json({success: true, message: `Update the bootcamp ${req.params.id}`});
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({success: true, message: `Deleting the bootcamp ${req.params.id}`});
});

module.exports = router;