// 模块导入
import app from 'app'
import css_core from './style/core/core.css'
import css_template from './modules/index/index.css'
import initModule from './modules/index/index.js'

// 应用初始化
app.init()

/*
 * 模块运行
 * 将应用的注册参数传入
 */
initModule(app.configMap)
