# :sob::sob::sob::sob::sob::sob::sob::sob:

POUR INSTALLER TU FAIT :

-   composer update
-   composer install
-   lancer `docker-compose down --remove-orphans --volumes` pas grave si ca foire
-   docker-compose build --no-cache --pull
-   docker-compose up -d

Ensuite dans le cli PHP de docker tu fais :

-   php bin/console make:migration
-   php bin/console doctrine:migrations:migrate
