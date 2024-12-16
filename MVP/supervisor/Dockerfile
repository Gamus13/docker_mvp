FROM php:8.2-fpm-alpine

# Installer Supervisor et d'autres dépendances nécessaires
RUN apk update && apk add --no-cache \
    supervisor \
    postgresql-dev 

# Installer les extensions PHP nécessaires
RUN docker-php-ext-install pdo pdo_pgsql

# Créer les répertoires nécessaires
RUN mkdir -p /etc/supervisor/logs /etc/supervisor.d

# Copier la configuration de Supervisor
COPY supervisord.conf /etc/supervisor/supervisord.conf

# Copier la configuration spécifique pour laravel-worker
COPY laravel-worker.ini /etc/supervisor.d/laravel-worker.ini

# Commande par défaut pour démarrer supervisord
CMD ["/usr/bin/supervisord", "-n"]
