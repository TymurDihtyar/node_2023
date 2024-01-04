const path = require('path')
const fs = require('fs')
const mainPath = path.join(__dirname, 'files')

fs.mkdir(mainPath, (err) => {
    if (err) throw err;
    for (let i = 1; i <= 5; i++) {
        fs.mkdir(path.join(mainPath, `data_${i}`), () => {
        })
        fs.writeFile(path.join(mainPath, `file_${i}`), `this is text for file${i}`, () => {
        })
    }

    let pathsToCheck = []
    for (let i = 1; i <= 5; i++) {
        pathsToCheck.push(path.join(mainPath, `data_${i}`))
        pathsToCheck.push(path.join(mainPath, `file_${i}`))
    }

    for (let i = 0; i < pathsToCheck.length; i++) {
        const normPath = path.normalize(pathsToCheck[i])
        fs.stat(normPath, (err, stats) => {
            if (err) throw err;
            if (stats.isDirectory()) {
                console.log(`Directory: ${path.basename(normPath)}`);
            } else if (stats.isFile()) {
                console.log(`FILE: ${path.basename(normPath)}`);
            }
        });
    }
})








