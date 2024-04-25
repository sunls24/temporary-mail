# 🧰 自建部署教程

## 邮件接收原理

使用 Cloudflare 的邮件转发功能，将接收到的所有邮件转发到目标邮箱中，然后本程序会从目标邮箱中获取邮件。

**所以自建邮箱域名必须使用 Cloudflare 进行 DNS 解析**

## 开启邮件转发

1. 首先开启邮件转发，按照流程一步一步来就行

2. 然后需要添加一条`Catch-All`的规则到目标邮箱中

![email-routing.png](doc/email-routing.png)

## 配置邮件接收规则

默认会从垃圾邮件`Junk`文件夹中获取，可通过`IMAP_PATH`环境变量指定。

需要添加一个或多个邮件规则，将接收到的目标邮件移动到指定的文件夹下

![rule.png](doc/rule.png)

## 修改代码部分

todo

部署时需要配置目标邮箱的IMAP_HOST, IMAP_PORT, IMAP_USER, IMAP_PASS
