import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'


export const STATUE_CREATED = 'STATUE_CREATED'

const api = new API()

export default (statue) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/statues', statue)
      .then((res) => {
        dispatch({ type: STATUE_CREATED, payload: res.body  })

        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
