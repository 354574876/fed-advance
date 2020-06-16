## 工程化 && 自动化构建

### 简单题目

#### 1. 谈谈你对工程化的初步认识，结合你之前遇到的问题说出三个工程化能够解决的问题或者带来的价值

**解析：**  

在我们传统开发模式中，随着业务的增加以及开发团队人员的扩大；会在开发过程中发现有很多问题：比如传统语言或者语法的一些弊端，想使用新的语法特性浏览器不支持；无法使用模块化/组建化的思想和规范；大量的重复性的工作；团队内部个人员的代码风格，以及质量无法达到统一；依赖后端的接口服务支持，不能独立运行前端工程；这个时候前端工程化思想应用而生了。


#### 2. 你任务脚手架除了为我们创建项目结构，还有什么更深的意义
**解析：**  
其实脚手架是我们工程化思想落地的一种工具产物；它除了可以为我们创建项目结构还可以提升开发效率，提高代码质量，降低开发成本；

### 编程题

#### 1. 简述脚手架实现过程，并使用NodeJS完成一个自定义的小型脚手架工具  
**解析：**  
脚手架的本质是创建项目基础结构，提供项目规范和约定；它能够替我们解决很多重复性的工作；
代码路径：
```javascript
const Generator = require('yeoman-generator')
const fs = require('fs')
const path = require('path')

module.exports = class extends Generator {
  prompting () {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        defautl: this.appname
      }
    ])
    .then(answers => {
      this.answers = answers
    })
  }
  writing (){
    // 获取目录下的所有模板文件
    const filesList = [
      '.browserslistrc',
      '.editorconfig',
      '.env.development',
      '.env.production',
      '.eslintrc.js',
      '.gitignore',
      'README.md',
      'babel.config.js',
      'package.json',
      'postcss.config.js',
      'public/favicon.ico',
      'public/index.html',
      'src/App.vue',
      'src/assets/logo.png',
      'src/components/HelloWorld.vue',
      'src/main.js',
      'src/router.js',
      'src/store/actions.js',
      'src/store/getters.js',
      'src/store/index.js',
      'src/store/mutations.js',
      'src/store/state.js',
      'src/utils/',
      'src/utils/request.js',
      'src/views/About.vue',
      'src/views/Home.vue',
    ]
    filesList.forEach(item => {
      // 将文件生成到目标目录
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}
```