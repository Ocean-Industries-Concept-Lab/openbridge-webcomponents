from mcr.microsoft.com/playwright:v1.50.1-noble
workdir /app
copy package-lock.json .
workdir /app/packages/openbridge-webcomponents
copy packages/openbridge-webcomponents/package.json .
run npm install --ci
copy packages/openbridge-webcomponents .
cmd ["npm", "run", "test-storybook", "--", "--url", "http://host.docker.internal:6006"]

npm run test-storybook -- --url http://host.docker.internal:6006 -u