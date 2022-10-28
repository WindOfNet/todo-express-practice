import todoData from '../models/todoContext.js'
import errors from '../models/errors.js'
import { todoStatus } from '../models/defineds.js'

export default {
  getAll: function () {
    return { errorCode: 0, result: todoData }
  },
  get: function (id) {
    const data = todoData.find((x) => x.id === id)
    if (data === undefined) {
      return errors.TODO_NOT_EXISTS
    }

    return { errorCode: 0, result: data }
  },
  create: function (name) {
    if (!name) {
      return errors.NAME_IS_REQUIRE
    }

    if (todoData.map((x) => x.name).includes(name)) {
      return errors.DUPLICATE_TODO_NAME
    }

    const id =
      todoData.length === 0 ? 1 : Math.max(...todoData.map((x) => x.id)) + 1
    const data = { id, name, status: 0 }
    todoData.push(data)
    return { errorCode: 0, result: data }
  },
  update: function (id, status) {
    const dataIndex = todoData.findIndex((x) => x.id === id)
    if (dataIndex === -1) {
      return errors.TODO_NOT_EXISTS
    }

    if (!Object.values(todoStatus).includes(status)) {
      return errors.UNKNOW_STATUS
    }

    const data = todoData[dataIndex]
    data.status = status
    todoData.splice(dataIndex, 1, data)
    return { errorCode: 0, result: data }
  },
  remove: function (id) {
    const dataIndex = todoData.findIndex((x) => x.id === id)
    if (dataIndex === -1) {
      return errors.TODO_NOT_EXISTS
    }

    const data = todoData[dataIndex]
    todoData.splice(dataIndex, 1)
    return { errorCode: 0, result: data }
  },
}
