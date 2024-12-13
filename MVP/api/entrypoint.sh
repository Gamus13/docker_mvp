#!/bin/bash

# Ajuste l'UID et le GID pour correspondre à ceux de l'hôte
if [ ! -z "$UID" ] && [ ! -z "$GID" ]; then
  groupmod -g $GID www
  usermod -u $UID -g $GID www
  chown -R www:www /var/www/html
fi

# Exécute la commande donnée au conteneur
exec "$@"
