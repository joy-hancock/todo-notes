import React from 'react'

/*Pass state info from App.js to Header for search and add new note*/
/*Input passes to value and props*/

const Header = (props) => (
	<header classsName='app-header'>
		<h1 className='app-header__title'>Super Sticky Notes</h1>
		<aside className='app-header__controls'>
			<button onClick={props.addNote} className='add-new'>
				+ New Note
			</button>
			<input
				onChange={props.onSearch}
				type='text'
				placeholder='Type here to search...'
				className='search'
				value={props.searchText}
			/>
		</aside>
	</header>
)
export default Header
