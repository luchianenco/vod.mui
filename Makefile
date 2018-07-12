PATH_DOCKER_RESOURCES = resources/docker
DOCKER_COMPOSE        = docker-compose

.PHONY: dev
dev: _dev_start_up setup

.PHONY: update
update:
	$(DOCKER_COMPOSE) build vod.mui
	$(DOCKER_COMPOSE) up -d


.PHONY: stop
stop:
	$(DOCKER_COMPOSE) stop

.PHONY: clean
clean:
	$(DOCKER_COMPOSE) down -v --rmi all --remove-orphans

.PHONY: console
console:
	$(DOCKER_COMPOSE) run --rm nodejs bash < /dev/tty

.PHONY: _dev_start_up
_dev_start_up:
	$(DOCKER_COMPOSE) up -d