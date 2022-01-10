import React from 'react'
import Note from './Note.js'

/*Render notes from Note.js. Use note and key to separate each note.
Filter text searches for notes. Create callback functions to be used in mapping and filtering. */

const keepSearchMatches = (note) => note.doesMatchSearch

const NotesList = (props) => {
	const renderNote = (note) => (
		<Note
			note={note}
			key={note.id}
			onType={props.onType}
			remove={props.remove}
		/>
	)

	const goodMatch = props.notes.filter(keepSearchMatches)
	const noteElements = goodMatch.map(renderNote)
	return <ul className='notes-list'>{noteElements}</ul>
}

export default NotesList
