const fs = require('fs')
const {exec} = require('child_process')
const program = require('commander')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const symbols = require('log-symbols')
const gitRepo = require('./config')

const FssBp = () => {
  program.version(require('../package.json').version, '-v, --version')
    .command('i')
    .action(() => {
      inquirer.prompt([
        {
          type: 'list',
          message: '请选择项目',
          name: 'project',
          choices: Object.keys(gitRepo)
        },
        {
          name: 'name',
          message: '请输入项目名称',
          default: 'demo'
        },
        {
          name: 'version',
          message: '请输入版本号',
          default: '0.0.0'
        },
        {
          name: 'description',
          message: '请输入项目描述',
          default: ''
        },
        {
          name: 'author',
          message: '请输入作者名称',
          default: 'millionfor'
        },
        {
          name: 'email',
          message: '请输入邮箱地址',
          default: 'quanquansy@gmail.com'
        }
      ]).then(answers => {
        let name = answers.name;
        if (!fs.existsSync(name)) {
          const spinner = ora('项目下载中...')
          spinner.start()
          download(
            `direct:${gitRepo[answers.project]}#master`,
            `${name}/`,
            { clone: true }, err => {
            if (err) {
              spinner.fail()
              console.log(symbols.error, chalk.red(err))
            } else {
              spinner.succeed()
              const meta = {
                name,
                version: answers.version,
                description: answers.description,
                author: answers.author,
                email: answers.email
              }

              const fileName = `${name}/package.json`

              if (fs.existsSync(fileName)) {
                const content = fs.readFileSync(fileName).toString()
                const result = handlebars.compile(content)(meta)
                fs.writeFileSync(fileName, result)
              }
            }
          })
        } else {
          console.log(symbols.error, chalk.red('该项目已存在'))
        }
      })
    })

  program.parse(process.argv)
}

module.exports = FssBp
