FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json /app

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY mainconfig.conf /etc/nginx/conf.d/mainconfig.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
