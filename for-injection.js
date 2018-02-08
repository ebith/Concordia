(() => {
  const fs = require('fs');
  const os = require('os');
  const path = require('path');

  const homeDir = os.homedir();
  const injectionDir = path.join(homeDir, 'Concordia');

  let settings = {};
  try {
    settings = require(path.join(injectionDir, 'settings.js'), 'utf-8');
  } catch (err) {}
  settings.version = '0.3.0';
  const script = document.createElement('script');
  script.innerHTML = 'let Concordia = ' + JSON.stringify(settings) + ';';
  document.head.appendChild(script);

  fs.readdir(injectionDir, (err, files) => {
    if (err) {
      return console.log(err);
    }
    for (const file of files) {
      if (/\.js$/.test(file)) {
        fs.readFile(path.join(injectionDir, file), 'utf-8', (err, userJs) => {
          if (err) {
            return console.log(err);
          }
          const script = document.createElement('script');
          script.id = file.split('.')[0];
          script.innerHTML = '(()=>{' + userJs + '})();';
          document.head.appendChild(script);
        });
      } else if (/\.css$/.test(file)) {
        fs.readFile(path.join(injectionDir, file), 'utf-8', (err, userCss) => {
          if (err) {
            return console.log(err);
          }
          const style = document.createElement('style');
          style.id = file.split('.')[0];
          style.innerHTML = userCss;
          document.head.appendChild(style);
        });
      }
    }
  });
})();
