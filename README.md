# Symfony Docker

## Lancement

1. `docker compose up -d`

Ensuite faire:

1. `cd symfony_project`
2. `composer install`
3. `cd ../client`
4. `npm install`

Puis dans la console symfony:

1. `cd symfony_project`
2. `php bin/console doctrine:database:drop --force`
3. `php bin/console doctrine:database:create`
4. `php bin/console make:migration`
5. `php bin/console doctrine:migrations:migrate`
6. `php bin/console doctrine:fixtures:load`
7. `php bin/console lexik:jwt:generate-keypair`
