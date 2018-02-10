FROM alpine:3.7

RUN apk --no-cache add \
    ruby \
    nginx \
    rm -rf /var/cache/apk/*

COPY nginx/nginx.conf.erb /etc/nginx/
COPY nginx/start.sh /
RUN chmod 755 start.sh

COPY dist/* /usr/share/nginx/html/

CMD ["sh", "start.sh"]
