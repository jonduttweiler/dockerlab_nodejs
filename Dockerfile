FROM node:10.15.3
LABEL maintainer="jduttweiler@santafe.gov.ar"

# Create app directory
WORKDIR /usr/src/app

COPY ./app/ ./
RUN npm install -f

EXPOSE 8080
CMD ["npm","start"]
