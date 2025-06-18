FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json /app

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM nginx:alpine as production

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

RUN rm /etc/nginx/conf.d/default.conf

COPY mainconfig.conf /etc/nginx/conf.d/mainconfig.conf

EXPOSE 80

CMD [ "/docker-entrypoint.sh" ]
