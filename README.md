# Node.js 仿知乎 API

# Session

## 优势

* 相比 JWT，最大的优势就在于可以主动清除 session

* session 保存在服务器端，相对较为安全

* 结合 cookie 使用，较为灵活，兼容性较好

## 劣势

* cookie + session 在跨域场景表现并不好

* 如果是分布式部署，需要做多机共享 session 机制

* 基于 cookie 的机制很容易被 CSRF

* 查询 session 信息可能会有数据库查询操作

