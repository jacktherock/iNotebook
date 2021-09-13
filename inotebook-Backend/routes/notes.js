const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
var fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get all the notes: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {//Catch error when server is down
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})


// ROUTE 2: Add a new Note: POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title!').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters!').isLength({ min: 5 }),], async (req, res) => {

        try {
            const { title, description, tag } = req.body;

            // If there are errors return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)

        } catch (error) {//Catch error when server is down
            console.error(error.message);
            res.status(500).send("Internal Server Error!");
        }
    })


// ROUTE 3: Update an existing note: PUT "/api/notes/updatenote/:id". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found!") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {//Catch error when server is down
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }

})


// ROUTE 4: Delete an existing note: DELETE "/api/notes/deletenote/:id". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found!") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted!", note: note });

    } catch (error) {//Catch error when server is down
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})

module.exports = router