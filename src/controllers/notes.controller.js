const notesController = {}

const Note = require('../models/Note')

notesController.createNote = async (req,res) => {
    const { title, description , user } = req.body

    const errors = []
    if (!title) errors.push({ value: 'Add title to Note'}) 
    if (!description) errors.push({ value: 'Add description to Note'}) 
    
    if (errors.length > 0) {
        res.json( { success: false , msg: errors} )
    }

    const newNote = new Note({ title, description , user})
    await newNote.save()
    res.json( {success: true , msg: 'New note saved' } )

}


notesController.myNotes = async (req,res) => {
    const { user } = req.body
    const notes = await Note.find( { user } )
    if (!notes) {
        res.json( { success: false , msg: 'No notes'} )
    }
    res.json( {success:true , msg: 'There are notes' , notes} )
}

notesController.myNote = async (req,res) => {    
    const note = await Note.findById(req.params.id)
    if (!note) {
        res.json( {success:false , msg: 'No exist'} )
    }
    res.json( {success:true , msg: 'There are notes' , note} )
}


notesController.updateNote = async (req,res) => {
    const { title, description } = req.body
    await Note.findByIdAndUpdate(req.params.id, { title, description } )
    res.json( {success:true , msg: 'Note edited'} )
}


notesController.deleteNote = async (req,res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json( {success:true , msg: 'Note deleted'} )
}


module.exports = notesController