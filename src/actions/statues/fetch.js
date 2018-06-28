import ApiClient from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
export const FETCHED_STATUES = 'FETCHED_STATUES'


const api = new ApiClient()

export default () => {
  return dispatch => {

    dispatch({ type: APP_LOADING })

    api.get('/statues')
      .then((res) => {

        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_STATUES,
          payload: res.body
        })
        console.log(res.body)
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
