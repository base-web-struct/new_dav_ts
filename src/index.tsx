import dva from 'dva'
import { RouterConfig } from './routes'
import { globalModel } from './models/global'
import 'antd/es/button/style/index.css'
import './assets/styles/index.scss'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// @ts-ignore
app.model(globalModel)

// 4. Router
app.router(RouterConfig);

// 5. Start
app.start('#root');
