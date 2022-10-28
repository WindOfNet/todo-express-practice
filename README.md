# todo express practice

express restful api practice

## todo API list

- GET /todos - 取得 todo 清單
- GET /todo/:todoId - 取得 todo 資訊
  ### path parameters
  | name   | type   | desc       |
  | ------ | ------ | ---------- |
  | todoId | number | todo 的 id |
- POST /todo - 新增 todo
  ### JSON body parameters
  | name     | type   | desc        |
  | -------- | ------ | ----------- |
  | todoName | number | 欲新增的 todo 名稱 |
- PATCH /todo/:todoId/status - 更新 todo 狀態
  ### path parameters
  | name   | type   | desc       |
  | ------ | ------ | ---------- |
  | todoId | number | todo 的 id |
  ### JSON body parameters
  | name   | type   | desc                                        |
  | ------ | ------ | ------------------------------------------- |
  | status | number | todo 的狀態代碼 <br/> 0: 待辦 <br/> 1: 完成 |
- DELETE /todo/:todoId - 刪除 todo
  ### path parameters
  | name   | type   | desc       |
  | ------ | ------ | ---------- |
  | todoId | number | todo 的 id |
