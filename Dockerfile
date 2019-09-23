FROM node:10.15.0 as build

# Create app directory
WORKDIR /actyv/app

#For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./
COPY .env ./
RUN npm cache verify
RUN rm -rf node_modules/
RUN npm install --production --loglevel verbose


COPY . ./
RUN npm run build

FROM node:10.15.0 as release

COPY --from=build /actyv/app/build ./build
RUN npm install -g serve
EXPOSE 5000

CMD [ "serve", "-s", "build" ] 
