#!/bin/bash

# Arrêt et suppression des conteneurs Docker existants liés au docker-compose
docker-compose down
docker-compose rm -f

# Suppression des images Docker associées au docker-compose
docker-compose down --rmi all

# Lancement du nouveau conteneur Docker
docker-compose up -d

echo "step 1:"
docker-compose run --rm -w /var/www/symfony_project symfony composer install
echo "step 2:"
docker-compose run --rm -w /var/www/symfony_project symfony php bin/console doctrine:database:drop --force
echo "step 3:"
docker-compose run --rm -w /var/www/symfony_project symfony php bin/console doctrine:database:create --no-interaction
echo "step 4:"
cd symfony_project/migrations && rm -rf *.php
cd ../../
docker-compose run --rm -w /var/www/symfony_project symfony php bin/console make:migration --no-interaction
echo "step 5:"
docker-compose run --rm -w /var/www/symfony_project symfony php bin/console doctrine:migrations:version --delete --all
docker-compose run --rm -w /var/www/symfony_project symfony php bin/console doctrine:migrations:migrate --no-interaction
echo "step 6:"
docker-compose run --rm -w /var/www/symfony_project symfony php bin/console doctrine:fixtures:load --no-interaction
echo "step 7:"
docker-compose run --rm -w /var/www/symfony_project symfony php bin/console lexik:jwt:generate-keypair --overwrite --no-interaction

