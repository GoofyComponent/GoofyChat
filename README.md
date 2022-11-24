# Symfony Docker

## Lancement

1. `docker compose up -d`

Ensuite faire:

1. `cd symfony_project`
2. `composer install`
3. `cd ../client`
4. `npm install`

Puis dans la console symfony:

1. `php bin/console doctrine:database:create`
2. `php bin/console doctrine:migrations:migrate`
3. `php bin/console doctrine:fixtures:load`
