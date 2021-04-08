const express = require("express");
const router = new express.Router();
const shoppingItems = require("../fakeDb")
const ExpressError = require("../expressError");

router.get('/', (req, res) => {
    res.json({items})
});

router.post('/', (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price }
    console.log(newItem)
    items.push(newItem)
    res.status(201).json( {added: newItem })
});

router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    res.json({ foundItem })
});

router.patch('/:name', (req,res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    } 
    foundItem.name = req.body.name
    foundItem.price = req.body.price
    res.json({ updated: foundItem })
});

router.delete('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined) {
        throw new ExpressError("Item not found", 404)
    } 
    items.splice(foundItem, 1)
    res.json({ message: "Deleted" })
});

module.exports = router;