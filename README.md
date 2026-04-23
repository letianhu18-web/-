# 手势控制颗粒圣诞树（Python 可运行）

这是一个网页交互示例：
- 用摄像头识别手势（MediaPipe Hands）
- 根据手掌手指张开程度缩放颗粒圣诞树（Three.js）

## 运行方式（Python）

```bash
python app.py
```

默认地址：`http://127.0.0.1:8000/index.html`

可选参数：

```bash
python app.py --host 0.0.0.0 --port 9000 --no-browser
```

## 文件说明

- `app.py`：Python 本地启动器（HTTP Server）
- `index.html`：页面结构和脚本引入
- `styles.css`：页面样式
- `script.js`：3D 颗粒树 + 手势识别逻辑

## 注意

- 浏览器会请求摄像头权限，请点击允许。
- 建议使用 Chrome/Edge 最新版。
- 如果你是在远程环境打开，请确认摄像头权限和地址可访问性。
