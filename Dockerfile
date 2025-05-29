FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Install and configure locales
RUN apt-get update && apt-get install -y locales && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8

ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

WORKDIR /app
COPY package-lock.json .
COPY package.json .
WORKDIR /app/packages/openbridge-webcomponents
COPY packages/openbridge-webcomponents/package.json .
COPY packages/openbridge-webcomponents/*.tgz .
RUN npm install --ci
COPY packages/openbridge-webcomponents .
CMD ["npm", "run", "test-storybook", "--", "--url", "http://host.docker.internal:6006"]