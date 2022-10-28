import { describe, test, expect } from '@jest/globals'
import service from '../services/todoService'
import errors from '../models/errors'

test('get all todos', () => {
  const { result } = service.getAll()
  expect(result.length).toBe(0)
})

describe('create', () => {
  test('create a null item', () => {
    const { errorCode, message, result } = service.create(null)
    expect(errorCode).toBe(errors.NAME_IS_REQUIRE.errorCode)
    expect(message).toBe(errors.NAME_IS_REQUIRE.message)
    expect(result).toBe(undefined)
    expect(service.getAll().result.length).toBe(0)
  })

  test('create a empty item', () => {
    const { errorCode, message, result } = service.create('')
    expect(errorCode).toBe(errors.NAME_IS_REQUIRE.errorCode)
    expect(message).toBe(errors.NAME_IS_REQUIRE.message)
    expect(result).toBe(undefined)
    expect(service.getAll().result.length).toBe(0)
  })

  test('create first item', () => {
    const { errorCode, message, result } = service.create('nodejs')
    expect(result.id).toBe(1)
    expect(result.name).toBe('nodejs')
    expect(result.status).toBe(0)
    expect(errorCode).toBe(0)
    expect(message).toBe(undefined)
  })

  test('create second item', () => {
    const { errorCode, message, result } = service.create('rust')
    expect(result.id).toBe(2)
    expect(result.name).toBe('rust')
    expect(result.status).toBe(0)
    expect(errorCode).toBe(0)
    expect(message).toBe(undefined)
  })

  test('create third item (duplicate name)', () => {
    const { errorCode, message, result } = service.create('nodejs')
    expect(errorCode).toBe(errors.DUPLICATE_TODO_NAME.errorCode)
    expect(message).toBe(errors.DUPLICATE_TODO_NAME.message)
    expect(result).toBe(undefined)
    expect(service.getAll().result.length).toBe(2)
  })
})

describe('get todo info', () => {
  test('get not exists by id', () => {
    const { errorCode, message, result } = service.get(-1)
    expect(errorCode).toBe(errors.TODO_NOT_EXISTS.errorCode)
    expect(message).toBe(errors.TODO_NOT_EXISTS.message)
    expect(result).toBe(undefined)
  })

  test('get not exists by null', () => {
    const { errorCode, message, result } = service.get(null)
    expect(errorCode).toBe(errors.TODO_NOT_EXISTS.errorCode)
    expect(message).toBe(errors.TODO_NOT_EXISTS.message)
    expect(result).toBe(undefined)
  })

  // query after created
  test('get created item', () => {
    const { errorCode, message, result } = service.get(1)
    expect(errorCode).toBe(0)
    expect(message).toBe(undefined)
    expect(result.id).toBe(1)
    expect(result.name).toBe('nodejs')
    expect(result.status).toBe(0)
  })
})

describe('update', () => {
  test('update not exists item by id', () => {
    const { errorCode, message, result } = service.update(-1, 1)
    expect(errorCode).toBe(errors.TODO_NOT_EXISTS.errorCode)
    expect(message).toBe(errors.TODO_NOT_EXISTS.message)
    expect(result).toBe(undefined)
  })

  test('update not exists item by null', () => {
    const { errorCode, message, result } = service.update(null, 1)
    expect(errorCode).toBe(errors.TODO_NOT_EXISTS.errorCode)
    expect(message).toBe(errors.TODO_NOT_EXISTS.message)
    expect(result).toBe(undefined)
  })

  test('update a item to another status', () => {
    const { errorCode, message, result } = service.update(1, 1)
    expect(errorCode).toBe(0)
    expect(message).toBe(undefined)
    expect(result.status).toBe(1)

    // query after updated
    const { result: updatedFetchResult } = service.get(1)
    expect(updatedFetchResult.status).toBe(1)
  })

  test('update a item to unknow status', () => {
    const { errorCode, message, result } = service.update(1, 999)
    expect(errorCode).toBe(errors.UNKNOW_STATUS.errorCode)
    expect(message).toBe(errors.UNKNOW_STATUS.message)
    expect(result).toBe(undefined)
  })
})

describe('remove', () => {
  test('remove not exists item by id', () => {
    const { errorCode, message, result } = service.remove(-1)
    expect(errorCode).toBe(errors.TODO_NOT_EXISTS.errorCode)
    expect(message).toBe(errors.TODO_NOT_EXISTS.message)
    expect(result).toBe(undefined)
  })

  test('remove not exists item by null', () => {
    const { errorCode, message, result } = service.remove(null)
    expect(errorCode).toBe(errors.TODO_NOT_EXISTS.errorCode)
    expect(message).toBe(errors.TODO_NOT_EXISTS.message)
    expect(result).toBe(undefined)
  })

  test('remove an exists item', () => {
    const { errorCode, message, result } = service.remove(1)
    expect(errorCode).toBe(0)
    expect(message).toBe(undefined)
    expect(result.id).toBe(1)

    // query after deleted
    const {
      errorCode: fetchErrorCode,
      message: fetchMessage,
      result: fetchResult,
    } = service.get(1)
    expect(fetchErrorCode).toBe(errors.TODO_NOT_EXISTS.errorCode)
    expect(fetchMessage).toBe(errors.TODO_NOT_EXISTS.message)
    expect(fetchResult).toBe(undefined)
  })
})
