import React, { Component } from 'react'
import Header from './components/Header'
import NotesList from './components/NotesList'

/*This component manages all of the state for this app, delgating rendering to presentational components. */

class App extends Component {
	state = {
		notes: [],
		searchText: '',
	}

	addNote = () => {
		const newNote = {
			id: Date.now(),
			title: '',
			description: '',
			doesMatchSearch: true,
		}
		const newNotes = [newNote, ...this.state.notes]
		this.setState({ notes: newNotes })
	}

	onType = (editMeId, updatedKey, updatedValue) => {
		/* this event handler updates sticky note text fields
    - updateId: the id of the note that the user typed in
    - updatedKey: which field was edited? 'title' or 'description'
    - updatedText: new value of edited field */
		const updateIdMatch = (note) => {
			if (note.id !== editMeId) {
				return note
			} else {
				if (updatedKey === 'title') {
					note.title = updatedValue
					return note
				} else {
					note.description = updatedValue
					return note
				}
			}
		}
		const updatedNotes = this.state.notes.map(updateIdMatch)
		this.setState({ notes: updatedNotes })
	}

	onSearch = (e) => {
		/* toggle the doesMatchSearch boolean value of each sticky
    note when the user types in the search field.
    Set the doesMatchSearch value to true for a sticky note if
    its title or description matches the search string. */
		const searchText = e.target.value.toLowerCase()
		const updatedNotes = this.state.notes.map((note) => {
			if (!searchText) {
				/* If the search field is empty, then
      we set the doesMatchSearch value for every note to true. */
				note.doesMatchSearch = true
				return note
			} else {
				const title = note.title.toLowerCase()
				const description = note.description.toLowerCase()
				const descriptionMatch = description.includes(searchText)
				const titleMatch = title.includes(searchText)
				const hasMatch = titleMatch || descriptionMatch
				note.doesMatchSearch = hasMatch
				return note
			}
		})
		this.setState({
			searchText: searchText,
			notes: updatedNotes,
		})
	}

	remove = (clickedId) => {
		const filterCallback = (note) => note.id !== clickedId
		const newNotes = this.state.notes.filter(filterCallback)
		this.setState({ notes: newNotes })
	}

	componentDidMount() {
		const savedNotesString = localStorage.getItem('savedNotes')
		if (savedNotesString) {
			const savedNotes = JSON.parse(savedNotesString)
			this.setState({ notes: savedNotes })
		}
	}

	componentDidUpdate() {
		const savedNotesString = JSON.stringify(this.state.notes)
		localStorage.setItem('savedNotes', savedNotesString)
	}

	render() {
		return (
			<div>
				<Header
					onSearch={this.onSearch}
					searchText={this.state.searchText}
					addNote={this.addNote}
				/>
				<NotesList
					notes={this.state.notes}
					onType={this.onType}
					remove={this.remove}
				/>
			</div>
		)
	}
}

export default App
