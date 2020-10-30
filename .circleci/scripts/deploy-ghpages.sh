#!/usr/bin/env sh

# abort on errors
set -e

cd repo/../../

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'hardlydifficult.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:nickcuso/hardlydifficult.git master:gh-pages

cd -