#!/bin/sh
NODE_ENV=production ./node_modules/forever/bin/forever start bin/www
echo Start Success!
