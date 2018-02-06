# Concordia
Inject JavaScript and CSS into Discord client

## Usage
```sh
git clone https://github.com/ebith/Concordia
cd Concordia
# copy core.asar from Discord app
#  Win: %APPDATA%/discord/0.0.xxx/modules/discord_desktop_core/core.asar
#  Mac: ~/Library/Application\ Support/discord/0.0.xxx/modules/discord_desktop_core/core.asar
yarn install
yarn start --inject
# copy core.asar into Discord app
# put your js and css into ~/Concordia
```
On Windows %USERPROFILE%/Concordia

### Options
- --inject
- --revert
- --core
  - default: ./core.asar
