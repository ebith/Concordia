(() => {
  const fs = require('fs');
  const os = require('os');
  const path = require('path');

  const homeDir = os.homedir();
  const injectionDir = path.join(homeDir, 'Concordia');

  const script = document.createElement('script');
  script.innerHTML = 'let Concordia = { version: "0.2.0" };';
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
