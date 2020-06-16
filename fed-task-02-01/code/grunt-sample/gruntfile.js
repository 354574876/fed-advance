const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
// Grunt 入口文件
module.exports = grunt => {
  // 配置
  grunt.initConfig({
    foo: {
      bar: 123
    },
    multiTask: {
      options: {
        foo: 'bar'
      },
      css: 'main.css',
      js: 'main.js',
      html: 'main.html'
    },
    clean: {
      temp: 'yarn-error.log'
    },
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        // key: 目标路径 value：原始路径
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      }
    }
  })

  grunt.registerTask('foo', () => {
    console.log('hello grunt')
    // 读取配置
    console.log(grunt.config('foo.bar'))
    // 告知是失败了
    return false
  })
  
  grunt.registerTask('default', ['sass', 'babel', 'watch'])
  // 异步任务
  grunt.registerTask('async-task', function() {
    const done = this.async()
    setTimeout(() => {
      console.log('async task')
      // false 失败任务
      done(false)
    }, 1000)
  })
  // 构建多任务
  grunt.registerMultiTask('multiTask', function () {
    console.log(this.target, this.data)
  })


  /**
   * Grunt 插件
   */
  // grunt.loadNpmTasks('grunt-contrib-clean')

  // grunt.loadNpmTasks('grunt-sass')

  // 自动加载所有的grunt插件中的任务
  loadGruntTasks(grunt)

}