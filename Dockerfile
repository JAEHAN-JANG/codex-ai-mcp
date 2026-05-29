FROM node:24-alpine

WORKDIR /app

COPY package.json ./
COPY index.html ./
COPY scripts ./scripts
COPY src ./src
COPY styles ./styles

ENV HOST=0.0.0.0
ENV PORT=4173

EXPOSE 4173

CMD ["npm", "start"]
