const chalk = require('chalk');

console.log(chalk.green('Success!'));
console.log()

console.log(chalk.red.bold('Error!'));
console.log()

console.log(chalk.yellow.underline('Warning!'));
console.log()

console.log(chalk.blue.bgWhite('Info message'));
console.log()

console.log(chalk.magenta.inverse('Inverted text'));
console.log()

console.log(chalk.cyan('This is a cyan colored'));
console.log()

console.log(chalk.bgCyan("hello world"));

const fs = require('fs')
fs.readFile('a.txt','utf-8', (err, data)=>{
    if (err)
        console.log(err)
    else
        console.log(data)
}) 


const {program} = require('commander')
program.name('words reader')
.description('it helps to read you number of words in a file')
.version('1.0.0')

program.command('count_words').argument('<fileName>', 'file to read').description('add a new file').action((fileName)=>{
    const fs = require('fs')
    fs.readFile(fileName, 'utf-8', (err, data)=>{
        if (err)
            console.log(err)
        else{
            //writing logic to count the number of words inside the file
            console.log(data.split(" ").length)
        }
    })
    
})

program.parse()