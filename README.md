# 五子棋游戏 (Gomoku Game)

一个基于现代 Web 技术的前端五子棋游戏，支持中文界面和获胜弹窗提示。

## 🎮 游戏特色

- **标准 15×15 棋盘** - 经典五子棋规格
- **中文界面** - 完整的中文提示和注释
- **获胜弹窗** - 明显的获胜提示和"再来一局"功能
- **响应式设计** - 支持桌面和移动设备
- **简洁美观** - 现代化的 UI 设计

## 🚀 运行方式

### 方式一：使用本地服务器（推荐）

```bash
# 进入项目目录
cd gomoku-game

# 使用 Python 启动本地服务器
python3 -m http.server 8000

# 在浏览器中访问 http://localhost:8000
```

### 方式二：直接打开文件

```bash
# 直接双击打开 index.html 文件
# 注意：某些浏览器可能限制本地文件的某些功能
```

### 方式三：使用其他服务器

```bash
# 使用 Node.js 的 http-server
npx http-server

# 使用 PHP 内置服务器
php -S localhost:8000

# 使用 Python 2.x
python -m SimpleHTTPServer 8000
```

## 🎯 游戏规则

1. **黑子先手**，玩家轮流在棋盘上放置棋子
2. **任意方向连成五子**即获胜（水平、垂直、对角线）
3. **点击棋盘格**放置棋子
4. **重新开始**按钮可随时重置游戏

## 📁 项目结构

```
gomoku-game/
├── index.html      # 主页面文件
├── styles.css      # 样式文件
├── game.js         # 游戏逻辑
└── README.md       # 项目说明
```

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **JavaScript (ES6+)** - 游戏逻辑
- **GitHub Pages** - 可选的部署平台

## 🌐 在线体验

项目已部署到 GitHub Pages：
[在线游玩五子棋](https://walker4753.github.io/gomoku-game/)

## 📦 安装与部署

### 本地开发

1. 克隆仓库：
   ```bash
   git clone https://github.com/walker4753/gomoku-game.git
   cd gomoku-game
   ```

2. 启动开发服务器：
   ```bash
   python3 -m http.server 8000
   ```

3. 打开浏览器访问 `http://localhost:8000`

### GitHub Pages 部署

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择 `main` 分支作为源
3. 访问 `https://你的用户名.github.io/gomoku-game`

## 🎨 功能特性

- [x] 完整的五子棋游戏逻辑
- [x] 中文界面和注释
- [x] 获胜弹窗提示
- [x] 响应式布局
- [x] 重新开始功能
- [x] 移动端适配
- [x] 美观的 UI 设计

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢使用本五子棋游戏！如有任何问题或建议，请提交 Issue。

---

**Happy Gaming! 🎮**