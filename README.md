# Package Updater
Update an NPM dependency of an existing repo and create a PR

## Usage
Add a function to your shell profile:
```sh
update-package() {
  PACKAGE_UPDATER_PATH='<THE_DIRECTORY_OF_THIS_REPO>'
  TEMP_NODE_VERSION=$(node -v)
  PACKAGE_NAME='<PACKAGE_YOU_WANT_TO_UPDATE>'
  REPO_TO_UPDATE='<ABSOLUTE_PATH_TO_REPO_YOU_WANT_TO_UPDATE>'

  cd $PACKAGE_UPDATER_PATH && nvm use $(cat .nvmrc) && PACKAGE_NAME=$PACKAGE_NAME NODE_VERSION=$TEMP_NODE_VERSION REPO_TO_UPDATE=$REPO_TO_UPDATE npm start
  echo Was on node $(node -v)
  nvm use $TEMP_NODE_VERSION
}
```

Run the function with `update-package`.
