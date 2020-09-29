const { Router } = require('express')
const router = Router()

const { checkPermission } = require('../helpers/check')

const {  
    createNote,
    myNotes,
    myNote,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller')

router.post('/notes', checkPermission , createNote)
router.get('/notes', checkPermission , myNotes)
router.get('/notes/:id', checkPermission , myNote)
router.put('/notes/:id', checkPermission , updateNote)
router.delete('/notes/:id', checkPermission , deleteNote)

module.exports = router