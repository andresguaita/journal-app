import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Startlogout } from '../../actions/auth'
import { startNewNote } from '../../actions/note'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(Startlogout())
  }

  const handleAddNew = () => {
    dispatch(startNewNote())
  }

  const { name } = useSelector(state => state.auth)

  return (
    <aside className='journal__sidebar'>

      <div className='journal__sidebar-navbar'>
        <h3 className='mt-5'>
          <i className="far fa-user" />
          <span>     {name}</span>
        </h3>

        <button
          onClick={handleLogout}
          className='btn'
        >
          Logout
        </button>
      </div>

      <div
        className='journal__new-entry'
        onClick={handleAddNew}
      >
        <i className='far fa-calendar-plus fa-5x' />
        <p className='mt-5'>
          New entry
        </p>
      </div>

      <JournalEntries />

    </aside>
  )
}
