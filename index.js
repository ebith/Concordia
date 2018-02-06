const fs = require('fs');
const util = require('util');
const args = require('mri')(process.argv.slice(2));
const asar = require('asar');
const fse = require('fs-extra');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

(async () => {
  const js = `mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.executeJavaScript(\`(() => {
      const fs = require('fs');
      const os = require('os');
      const path = require('path');

      const homeDir = os.homedir();
      const injectionDir = path.join(homeDir, 'Concordia');

      const script = document.createElement('script');
      script.innerHTML = 'let Concordia = { version: "0.2.0" };';
      document.head.appendChild(script);

      fs.readdir(injectionDir, (err, files) => {
        for (const file of files) {
          if (/\.js$/.test(file)) {
            fs.readFile(path.join(injectionDir, file), 'utf-8', (err, userJs) => {
              const script = document.createElement('script');
              script.innerHTML = '(()=>{' + userJs + '})();';
              document.head.appendChild(script);
            });
          } else if (/\.css$/.test(file)) {
            fs.readFile(path.join(injectionDir, file), 'utf-8', (err, userCss) => {
              const style = document.createElement('style');
              style.innerHTML = userCss;
              document.head.appendChild(style);
            });
          }
        }
      });
    })();\`);
  });mainWindow.webContents.`;

  const corePath = args.core || 'core.asar';
  const targetPath = 'tmp/app/mainScreen.js';
  const backupPath = `${targetPath}.backup`;

  await fse.remove('tmp').catch(err => {
    console.log(err);
  });
  util.promisify(fs.copyFile)(corePath, 'core.asar.backup');
  asar.extractAll(corePath, 'tmp');

  if (args.revert) {
    const backup = await readFile(backupPath);
    await writeFile(targetPath, backup);
    console.log('Reverting from backup...');
  } else if (args.inject) {
    const target = await readFile(targetPath, 'utf-8');
    if (target.includes(`mainWindow.webContents.on('dom-ready', () => {`)) {
      console.log('Maybe already injected.');
    }
    const injected = target.replace('mainWindow.webContents.', js);
    await writeFile(targetPath, injected);
    await writeFile(backupPath, target, {flag: 'wx'}).catch(() => {
      // File already exists
    });
    console.log('Injecting...');
  } else {
    console.log('Just extract core.asar and pack core.asar...');
  }

  asar.createPackage('tmp', 'core.asar', err => {
    if (err) {
      console.log('Failed to create core.asar');
    }
  });
})();
