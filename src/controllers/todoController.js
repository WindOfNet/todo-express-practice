import express from 'express'
import service from '../services/todoService.js'

const router = express.Router()

router.get('/todos', (_, res) => {
  const result = service.getAll()
  if (!result.errorCode) {
    res.send(result)
    return
  }

  res.status(400).send(result)
})

router.get('/todo/:todoId', (req, res) => {
  const result = service.get(Number(req.params.todoId))
  if (!result.errorCode) {
    res.send(result)
    return
  }

  res.status(400).send(result)
})

router.post('/todo', (req, res) => {
  const result = service.create(req.body.todoName)
  if (!result.errorCode) {
    res.status(201).send(result)
    return
  }

  res.status(400).send(result)
})

router.patch('/todo/:todoId/status', (req, res) => {
  const result = service.update(Number(req.params.todoId), req.body.status)
  if (!result.errorCode) {
    res.send(result)
    return
  }

  res.status(400).send(result)
})

router.delete('/todo/:todoId', (req, res) => {
  const result = service.remove(Number(req.params.todoId))
  if (!result.errorCode) {
    res.send(result)
    return
  }

  res.status(400).send(result)
})

export default router
