FROM mcr.microsoft.com/playwright:v1.50.1-noble
WORKDIR /app
COPY package-lock.json .
WORKDIR /app/packages/openbridge-webcomponents
COPY packages/openbridge-webcomponents/package.json .
RUN npm install --ci
COPY packages/openbridge-webcomponents .
CMD ["npm", "run", "test-storybook", "--", "--url", "http://host.docker.internal:6006"]