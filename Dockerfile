FROM gliderlabs/alpine:3.4

RUN apk --no-cache add \
    ruby \
    nginx

COPY nginx/nginx.conf.erb /etc/nginx/
COPY nginx/start.sh /
RUN chmod 755 start.sh

COPY dist/* /usr/share/nginx/html/

CMD ["sh", "start.sh"]
