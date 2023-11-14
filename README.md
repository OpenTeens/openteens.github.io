# OpenTeens 开源官网
OpenTeens Website: openteens.org

# How to build in vscode

为了实现动态路由，这个网站我用了一个很hackish的方法——404 redirect。所以它可能没办法用传统的静态方法开发调试。


1、下载一个插件，叫做live server
![mmexport1699751761314](https://github.com/OpenTeensCore/openteenscore.github.io/assets/88757735/252f562b-1736-4747-a1a6-bdbf7cff01ad)


2、搜索扩展设置，将默认404页面改为`/404.html`
![mmexport1699751775916](https://github.com/OpenTeensCore/openteenscore.github.io/assets/88757735/ba9e5f0b-7f44-44ac-8714-8fcdc4d012ec)


3、重启vscode，然后开启live server，就可以正常调试了。


（生产用户请使用专业web服务器，本地调试也可以选择自部署Nginx或Apache服务达到相同效果）
