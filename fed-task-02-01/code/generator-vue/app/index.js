const Generator = require('yeoman-generator')


module.exports = class extends Generator {
  prompting () {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      }
    ])
    .then(message => this.message = message)
  }
  writing () {
    const temp = this.templatePath('foo.ejs')
  }
}
