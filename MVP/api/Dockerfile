# Base image
FROM php:8.2.11-fpm

# Arguments pour UID, GID et nom d'utilisateur
ARG user=www
ARG uid=1000
ARG gid=1000

# Installer les dépendances système
RUN apt-get update \
    && apt-get install -y gnupg curl wget ca-certificates unzip lsb-release \
    && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y \
        libicu-dev \
        libpq-dev \
        libzip-dev \
        nodejs \
        postgresql-client-14 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Installer les extensions PHP nécessaires
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install intl pdo pdo_pgsql pgsql zip bcmath pcntl exif

# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Ajouter un utilisateur dynamique
RUN groupadd -g $gid $user && \
    useradd -u $uid -ms /bin/bash -g $gid $user

# Définir le dossier de travail
WORKDIR /var/www/html

# Copier les fichiers de configuration
COPY composer.lock composer.json /var/www/html/

# Copier tout le projet Laravel
COPY . /var/www/html

# Ajuster les permissions générales des fichiers et dossiers
RUN find . -type f -exec chmod 644 {} \; && \
    find . -type d -exec chmod 755 {} \; && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache && \
    chown -R $user:$user /var/www/html

# Installer les dépendances de Laravel
RUN composer install --optimize-autoloader --no-dev

# Ajouter le script d'entrée
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exposer le port 8000 pour PHP-FPM
EXPOSE 8000
