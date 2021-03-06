import Stack from "stack-utils"

import log from "lib/log"

async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    log.error(err.message)
    log.error(Stack.clean(err.stack))

    ctx.status = err.status || 500

    ctx.body = {
      message: err.message || "Internal Server Error"
    }
  }
}

export default errorHandler
