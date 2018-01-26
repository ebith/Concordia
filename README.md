# Concordia
Inject JavaScript and CSS into Discord client

## Usage
```sh
git clone https://github.com/ebith/Concordia
cd Concordia
# copy core.asar from Discord app
#  Win: %APPDATA%/discord/0.0.xxx/modules/discord_desktop_core/core.asar
#  Mac: ~/Library/Application\ Support/discord/0.0.xxx/modules/discord_desktop_core/core.asar
npm install
node index.js --inject # default: ~/.discord.user.(css|js)
# copy core.asar into Discord app
```

### Options
- --inject
- --revert
- --core
  - default: core.asar
- --css
  - default: ~/.discord.user.css
- --js
  - default: ~/.discord.user.js

### Other examples
```sh
yarn start --revert
yarn start --inject --css %USERPROFILE%/Dropbox/discord/user.css --js %USERPROFILE%/Dropbox/discord/user.js
yarn start --inject --css ~/Dropbox/discord/user.css --js ~/Dropbox/discord/user.js
```
