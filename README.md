# Symfony Docker

A [Docker](https://www.docker.com/)-based installer and runtime for the [Symfony](https://symfony.com) web framework, with full [HTTP/2](https://symfony.com/doc/current/weblink.html), HTTP/3 and HTTPS support.

![CI](https://github.com/dunglas/symfony-docker/workflows/CI/badge.svg)

## Lancement

1. `composer update`
2. `composer install`
3. `docker compose build --pull --no-cache`
4. `docker compose up`

Pour stopper :

-   Run `docker compose down --remove-orphans` to stop the Docker containers.
