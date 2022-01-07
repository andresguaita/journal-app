import Swal from 'sweetalert2'
import { db } from '../firebase/firebase-Config'
import { collection, addDoc, doc, updateDoc,deleteDoc } from 'firebase/firestore'
import { types } from '../types/types'
import { loadNotes } from '../helpers/loadNotes'
import { fileUpload } from '../helpers/fileUpload'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
    dispatch(activeNote(doc.id, newNote))
    dispatch( addNewNote( doc.id, newNote ) );
  }
}

export const activeNote = (id, note) => ({

  type: types.notesActive,
  payload: {
    id,
    ...note
  }
})

export const addNewNote = ( id, note ) => ({
  type: types.notesAddNew,
  payload: {
      id, ...note
  }
})

export const startLoadingNote = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!note.url) {
      delete note.url
    }

    const noteToFirestore = { ...note }
    delete noteToFirestore.id
    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
    await updateDoc(noteRef, noteToFirestore)
    dispatch(refreshNote(note.id, noteToFirestore))
    Swal.fire('Saved', note.title, 'success')
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note
    }
  }
})

export const setNotes = (notes) => (
  {
    type: types.notesLoad,
    payload: notes
  }
)

export const startUploading = (file) => {
  return async(dispatch, getState) =>{
    const {active:activeNote} = getState().notes
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    })
    const fileUrl = await fileUpload(file)

    activeNote.url = fileUrl

    dispatch(startSaveNote(activeNote))

    Swal.close()
    
  }
}

export const startDeleting = (id)=>{
  return async(dispatch, getState) => {

      const uid = getState().auth.uid;
      const noteRef = doc(db, `${uid}/journal/notes/${id}`)
      await deleteDoc(noteRef);

      dispatch(deleteNote(id));
  }
}

export const deleteNote = (id) => (
  {
    type: types.notesDelete,
    payload: id
  }
)

export const noteLogout = () => (
  {
    type: types.notesLogoutCleaning
  }
)
