FROM node:22.8.0-bookworm-slim
ENV TZ="America/New_York"
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN pwd
RUN ls -al
RUN npm install
COPY ./ ./
RUN npm run sync
CMD ["npm", "run", "prod"]
