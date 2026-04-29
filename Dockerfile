FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Install and configure locales
RUN apt-get update && apt-get install -y locales && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8

ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

# Use Playwright's built-in non-root user for test execution

WORKDIR /app
COPY package-lock.json .
COPY package.json .
WORKDIR /app/packages/openbridge-webcomponents
COPY packages/openbridge-webcomponents/package.json .
COPY packages/openbridge-webcomponents/*.tgz .
RUN npm ci --ignore-scripts && \
    chown -R pwuser:pwuser /app
COPY packages/openbridge-webcomponents .
RUN chown -R pwuser:pwuser /app

USER pwuser
CMD ["npm", "run", "test-storybook"]