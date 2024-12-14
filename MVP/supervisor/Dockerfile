FROM php:8.2-fpm-alpine

# Installer Supervisor et d'autres dépendances nécessaires
RUN apk update && apk add --no-cache supervisor

# Créer les répertoires nécessaires
RUN mkdir -p /etc/supervisor/logs

# Copier la configuration supervisord
COPY supervisord.conf /etc/supervisor/supervisord.conf

# Commande par défaut pour démarrer supervisord
CMD ["/usr/bin/supervisord", "-n"]
