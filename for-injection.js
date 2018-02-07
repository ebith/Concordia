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
})();
