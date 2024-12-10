FROM node:23-alpine3.19 AS build

WORKDIR /frontend
COPY . .
RUN npm install

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:1.27.3-alpine
COPY --from=build /frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD nginx -g 'daemon off;'