import express from "express"
import http from "http"

const IP_ADDRESS = "192.168.6.56"

const app = express()
const httpServer = http.createServer(app)

httpServer.listen(5000, IP_ADDRESS, () => {
  console.log(`Test on http://${IP_ADDRESS}:4000`)
})

process.on("SIGINT", function () {
  httpServer.close(() => {
    console.log("test")
    process.exit(0)
  })
})

process.on("SIGTERM", function () {
  httpServer.close(() => {
    console.log("test")
    process.exit(0)
  })
})
