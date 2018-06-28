import { FETCHED_STATUES} from '../actions/statues/fetch'


export default (state = [], {type, payload} = {}) => {
  switch(type) {
    case FETCHED_STATUES :
      return [ ...payload ]


    default :
      return state
  }
}
