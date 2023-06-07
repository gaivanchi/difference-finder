install: install-deps
	npm link

install-deps:
	npm ci

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm test -s -- --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

pu1blish:
	npm publish --dry-run
