// create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const comments = [
    {
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2019-5-17'
    },
    {
        name: '李四',
        message: '今天天气不错！',
        dateTime: '2019-5-17'
    },
    {
        name: '王五',
        message: '今天天气不错！',
        dateTime: '2019-5-17'
    },
    {
        name: '赵六',
        message: '今天天气不错！',
        dateTime: '2019-5-17'
    },
    {
        name: '田七',
        message: '今天天气不错！',
        dateTime: '2019-5-17'
    }
];

http.createServer((req, res) => {
    const parseObj = url.parse(req.url, true);
    const pathname = parseObj.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, data) => {
            if (err) {
                return res.end('404 Not Found.');
            }
            let htmlStr = data.toString();
            let html = '';
            comments.forEach(item => {
                html += `
                    <li>
                        <p>${item.name}</p>
                        <p>${item.message}</p>
                        <p>${item.dateTime}</p>
                    </li>
                `;
            });
            htmlStr = htmlStr.replace('<!-- 评论列表 -->', html);
            res.end(htmlStr);
        });
    } else if (pathname === '/post') {
        fs.readFile(path.join(__dirname, 'views', 'post.html'), (err, data) => {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    } else if (pathname.indexOf('/public/') === 0) {
        fs.readFile(path.join(__dirname, pathname), (err, data) => {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    }
