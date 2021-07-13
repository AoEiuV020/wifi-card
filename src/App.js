import React from 'react';
import { Card } from './components/Card';
import './style.css';

function App() {
  return (
    <div className="App">
      <h1>
        <span role="img" aria-label="antenna-bars">
          📶
        </span>
        &nbsp; WiFi 卡片
      </h1>

      <p className="tag">
        打印一张带有 WiFi 登录详细信息的简易卡片，可以贴在冰箱上或者放进钱包里。
      </p>

      <p className="tag">
      你的 WiFi 信息绝不会被发送到服务器上。本网站不使用跟踪、分析或其它定位，查看<a href="https://github.com/AoEiuV020/wifi-card">源代码</a>。
      </p>

      <p className="tag">
      框中将被打印的的文字都支持任意编辑，
      </p>

      <Card />
    </div>
  );
}

export default App;
