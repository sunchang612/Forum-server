const fs = require('fs')
const path = require('path')

function randomToken() {
  let charString = '1234567890qwertyuiopasdfghjklzxcvbnm'
  let token = ''
  for (var i = 0; i < 64; i++) {
    token += charString.charAt(Math.round(15 * Math.random()));
  }
  return token
}

// 找到或创建
function findOrCrateJson(addr, id) {
  const data = fs.readFileSync(addr, 'utf-8')

}

module.exports = (router) => {
  router.get('/welcome', async function (ctx, next) {
    ctx.body = 'hellow world'
  })
  
  router.get('/api/columns', (ctx) => {
    const file = path.resolve('./', 'mock/columns.json')
    // 读取文件
    const data = fs.readFileSync(file, 'utf-8')
    ctx.body = data
  })

  router.get('/api/login', async(ctx) => {
    const { email, password } = ctx.request.body
    const file = path.resolve('./', 'mock/users.json')
    const data = fs.readFileSync(file, 'utf-8')
    const pData = JSON.parse(data)
    if (!pData.length) {
      ctx.body = {
        status: 404,
        message: '未找到改用户'
      }
    } else {
      const token = randomToken()
      const isUser = pData.find(i => i.email === email)
      if (isUser) {
        ctx.body = {
          token
        }
      } else {
        ctx.body = {
          status: 404,
          message: '未找到改用户'
        }
      }
    }
    // 模拟数据库中读写or创建的过程
  })
}
