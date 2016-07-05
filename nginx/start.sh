#!/usr/bin/env bash

erb /etc/nginx/nginx.conf.erb > /etc/nginx/nginx.conf
nginx
