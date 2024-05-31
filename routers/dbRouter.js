const express = require('express')
const fs = require('fs')
const path = require('path')
var router = express.Router()

//导入模块
var sqlite3 = require("sqlite3").verbose()

// 指定数据库文件位置
const dbFilePath = path.join(__dirname, '../db/test.sqlite3');
var db = new sqlite3.Database(dbFilePath);

// 检查数据库文件是否已经存在，如果不存在则创建
if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, '');
}

router.get("/testlist", (req, res) => {
    db.all("select * from `user`", [], (err, rows) => {
        if (err === null) {
            res.send(rows)
        } else {
            res.send(err + '@@@' + dbFilePath)
        }
    })
})

module.exports = router


