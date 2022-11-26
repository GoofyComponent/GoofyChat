#!/bin/sh
set -e


if [ "$APP_ENV" != 'prod' ]; then
    cd /var/www/symfony_project 
    composer install --prefer-dist --no-progress --no-interaction
fi
