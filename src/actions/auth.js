import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { googleAuthProvider, app } from '../firebase/firebase-Config'
import { types } from '../types/types'
import Swal from 'sweetalert2'
import { finishLoading, startLoading } from './ui'
import { noteLogout } from './note'

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(login(user.uid, user.displayName))
    }).catch(() => {
      Swal.fire('Error', 'Incorrect Email or Password', 'error')
    }).finally(() => {
      dispatch(finishLoading())
    })
  }
}

export const startEmailRegister = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth(app)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name })
        dispatch(
          login(user.uid, user.displayName)
        )
      })
      .catch(() => {
        Swal.fire('Error', 'The email address is already in use by another account', 'error')
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth()
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}

export const login = (uid, displayName) =>
  ({
    type: types.login,
    payload: {
      uid,
      displayName
    }
  })

export const Startlogout = () => {
  return async (dispatch) => {
    const auth = getAuth()
    await signOut(auth)
    dispatch(logout())
    dispatch(noteLogout())
  }
}

export const logout = () => ({

  type: types.logout

}
)
