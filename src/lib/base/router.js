import {join} from "path"

import Router from "@koa/router"
import rd from "require-dir"

import iterator from "lib/helper/object/iterator"
import NotAllowed from "lib/error/http/NotAllowed"
import NotFound from "lib/error/http/NotFound"

const r = new Router()

function actionNotFound({url}) {
  throw new NotFound(`Page not found on route ${url}`)
}

function actionNotAllowed({method, url}) {
  throw new NotAllowed(`Method ${method} not allowed on route ${url}`)
}

const routers = rd(join(__dirname, "..", "..", "route"))

for (const [name, value] of iterator(routers).entries()) {
  const router = value.default ?? value

  r.use(`/${name}`, router.routes(), router.allowedMethods())
}

r.get("*", actionNotFound)
r.all("*", actionNotAllowed)

export default r
