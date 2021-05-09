//外部APIをloadshで見やすくする
import _ from 'lodash'
import { 
  READ_EVENTS,
  READ_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
} from '../actions'

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENT:
    case UPDATE_EVENT:
    case CREATE_EVENT:
      const data = action.response.data
      // console.log(action.response.data)
      // {id: 6, token: "token123", title: "Let's have an event 6!", body: "This is the body for event 6."
      return {...events, [data.id]: data }
    case READ_EVENTS:
      return _.mapKeys(action.response.data, 'id')
    case DELETE_EVENT:
      // console.log(action.id)
      delete events[action.id] //イベント情報が書き換えられている
      return {...events} //スプレッド演算子→アップデートされたオブジェクトを返す
    default:
      return events
  }
}