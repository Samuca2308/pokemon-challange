FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
COPY pokedex ./pokedex
COPY api ./api
RUN if [ ! -d "pokedex/node_modules" ]; then \
      cd pokedex && npm install --legacy-peer-deps; \
    fi && \
    if [ ! -d "api/node_modules" ]; then \
      cd api && npm install --legacy-peer-deps; \
    fi

RUN cd pokedex && npm run build
EXPOSE 4200 3000
CMD ["/bin/bash", "-c", "cd api && npm run start:dev & cd pokedex && npm start"]