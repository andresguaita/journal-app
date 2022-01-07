import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/note'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  const { active: activenote } = useSelector(state => state.notes)
  const [formValues, handleInputChange, reset] = useForm(activenote)

  const { body, title, id } = formValues

  const activeId = useRef(activenote.id)

  const dispatch = useDispatch()

  useEffect(() => {
    if (activenote.id !== activeId.current) {
      reset(activenote)
      activeId.current = activenote.id
    }
  }, [activenote, reset])

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }))
  }, [formValues, dispatch])

  const handleDelete = () =>{
    dispatch(startDeleting(id))
  }

  return (
    <div className='notes__main-content animate__animated animate__fadeInRight'>

      <NotesAppBar />

      <div className='notes__content'>

        <input
          type='text'
          placeholder='Some awesome title'
          className='notes__title-input'
          autoComplete='off'
          value={title}
          name='title'
          onChange={handleInputChange}
        />

        <textarea
          placeholder='What happened today'
          className='notes__textarea'
          value={body}
          name='body'
          onChange={handleInputChange}
        />

        {
          activenote.url &&
                      <div className='notes__image'>
                        <img
                          src={activenote.url}
                          alt='imagen'
                        />
                      </div>
        }

      </div>
      <button 
      className='btn btn-danger'
      onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}
