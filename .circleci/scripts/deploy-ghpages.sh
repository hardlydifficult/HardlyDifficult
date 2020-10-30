#!/usr/bin/env sh

# abort on errors
set -e

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'hardlydifficult.com' > CNAME


remote=$(git config remote.origin.url)
git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:nickcuso/hardlydifficult.git master:gh-pages

cd -