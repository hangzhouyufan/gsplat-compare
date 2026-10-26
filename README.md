# 3DGS 对比查看器

左右拖入本地 3D Gaussian Splatting 模型，独立调整后点击「绑定当前视角」。固定水平 FOV 85°，响应窗口尺寸自动换算垂直 FOV。文件在浏览器中解码，不上传服务器。

## 使用

- 支持 Spark 2.4 解码的 PLY、SPLAT、KSPLAT、SPZ、SOG、ZIP、RAD 文件；SOG 需为单文件归档，不支持散装目录。
- 默认「漫游」：左键转头、右键平移、滚轮前后移动；点击视窗后 WASD 移动，Q/E 升降，Shift 加速。
- 「环绕」：左键围绕目标旋转、右键平移、滚轮推近/拉远。
- 初始独立视角。手动对齐后绑定，保留相对旋转、位置偏移，以及当前观察距离之比作为移动尺度。任一侧操作都可带动另一侧。解除绑定后可重新对齐并绑定。
- 这是一种相机对齐，不是点云配准；两个模型尺度差异很大时，可先用滚轮调整观察距离再绑定。
- 「转正」沿观察轴每次旋转 90°，用于修正不同模型的朝上方向。「重置」恢复模型自动取景并解除绑定。
- 体验示例使用程序生成的真实 .splat 数据，通过同一文件解码和高斯渲染链路加载。
- 模型数量、大小受系统内存和显存限制。推荐桌面 Chrome/Edge 和 WebGL2 硬件加速。初始自动取景按包围盒计算，含远处离群点的模型可用漫游导航进入。

## 开发

Node.js 22+：

```sh
npm ci
npm run dev
npm test
npm run build
```

依赖锁定版本，由 Vite 打包并随网页部署，不依赖运行时 CDN，也不要求 SharedArrayBuffer/COOP/COEP 响应头。

## GitHub Pages

新建公开仓库，提交本项目到 main，在 Settings → Pages → Source 选择 GitHub Actions。仓库中的 pages.yml 自动测试、构建并发布。使用相对资源路径，支持 github.io/<仓库名>/ 子路径。不要将私人模型提交到公开仓库。

渲染：[Spark](https://sparkjs.dev/) / [Three.js](https://threejs.org/)。依赖遵循各自许可证。
