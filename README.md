# CryptoSim：虚拟比特币交易平台

一个模拟真实比特币（BTC）交易环境的 Web 应用程序。用户可以使用虚拟资金练习买卖 BTC，平台提供实时价格数据和历史趋势图表。

## 主要功能

-   **实时价格数据**：通过币安（Binance）的 WebSocket API 直接获取实时的 BTC/USDT 价格更新。
-   **实时交易 Feed**：实时观察真实的市场交易动态。
-   **交互式图表**：使用 Recharts 可视化多个时间范围（1分钟、30分钟、1小时、12小时、1天、7天、1个月）的历史价格数据。
-   **虚拟交易**：使用 100 美元的初始虚拟资金进行比特币的买卖操作。
-   **动态投资组合**：一个综合仪表盘，用于跟踪您的总投资组合价值、美元余额和比特币持有量。
-   **状态持久化**：您的投资组合和交易历史会自动保存到浏览器的 IndexedDB 中，确保在不同会话之间保留您的进度。
-   **用户认证**：简单的模拟 OAuth2 登录/登出流程，用于显示包含用户名和头像的用户个人资料。
-   **交易历史**：查看所有过去交易的详细列表。
-   **国际化 (i18n)**：完全支持英语和中文（中文），可从头部轻松切换。
-   **响应式界面**：使用 Tailwind CSS 构建的简洁、现代化的界面，可适应任何屏幕尺寸。

## 技术栈

-   **框架**：React
-   **语言**：TypeScript
-   **样式**：Tailwind CSS
-   **图表**：Recharts
-   **国际化**：i18next
-   **数据源**：币安官方 API (REST & WebSocket)
-   **本地存储**：使用 IndexedDB 进行投资组合持久化

## 快速开始

本项目采用现代化的、基于 import maps 的免构建开发环境。

1.  **克隆仓库（或下载文件）。**
2.  **启动项目目录。**
    您需要一个简单的本地 Web 服务器来运行 `index.html` 文件。您可以使用任何静态文件服务器，例如 Python 内置的 `http.server` 模块。
    ```bash
    # 确保您位于项目的根目录
    python -m http.server
    ```
    或者使用像 `serve` 这样的 npm 包：
    ```bash
    npx serve .
    ```
3.  **打开浏览器。**
    访问 `http://localhost:8000` （或您的服务器正在运行的端口）。

这样就可以了！应用程序现在应该已经成功运行。

## 项目结构

```
.
├── components/
│   ├── ui/               # 可复用的 UI 组件 (按钮, 卡片, 对话框等)
│   ├── AuthCallback.tsx    # 处理 OAuth 回调
│   ├── Dashboard.tsx       # 投资组合摘要
│   ├── ErrorBoundary.tsx   # 捕获 React 渲染错误
│   ├── Header.tsx          # 顶部导航栏，包含认证和语言切换功能
│   ├── LiveTradeFeed.tsx   # 显示实时市场交易
│   ├── PriceChart.tsx      # 交互式历史价格图表
│   ├── PriceChange.tsx     # 显示 24 小时价格变化
│   ├── TradePanel.tsx      # 用于买卖的主要组件
│   └── TransactionHistory.tsx # 用户的历史交易列表
├── hooks/
│   ├── useAuth.ts          # 管理用户认证状态
│   ├── useBitcoinPrice.ts  # 获取并管理所有价格数据 (历史和实时)
│   └── usePortfolio.ts     # 管理用户投资组合状态和交易
├── services/
│   ├── cryptoApi.ts        # 用于从币安 REST API 获取数据的函数
│   └── db.ts               # 用于存储投资组合数据的 IndexedDB 服务
├── lib/
│   └── utils.ts            # 工具函数 (例如用于合并 class 名称的 'cn' 函数)
├── App.tsx                 # 主应用组件，处理路由
├── constants.ts            # 应用全局常量
├── i18n.ts                 # i18next 配置和翻译文件
├── index.html              # 应用的入口 HTML 文件
├── index.tsx               # 渲染 React 应用
├── metadata.json           # 应用元数据
└── types.ts                # TypeScript 类型定义
```