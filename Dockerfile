FROM node:14-alpine3.14

# ARG user=app
# ARG group=app
# ARG uid=1001
# ARG gid=1001
# ARG port=3000

WORKDIR /app

# RUN addgroup -g ${gid} ${group} \
#     && adduser -u ${uid} -G ${group} -s /bin/sh -D ${user} \
#     && chown -R ${user}:${group} /app

COPY ./package*.json ./
RUN npm install

COPY . .

ENV PORT 3000
ENV SRVADDR localhost
ENV SRVPORT 3000
ENV APITIME 5000

# EXPOSE ${port}
# USER ${user}

CMD ["node", "index.js"]