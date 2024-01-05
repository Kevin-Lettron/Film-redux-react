FROM node:18.16.1-alpine as BUILDER

WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM nginx:1.25.3-alpine as DIST
COPY --from=BUILDER /app/dist/ /usr/share/nginx/html
COPY ./nginx/site.conf /etc/nginx/conf.d/default.conf
