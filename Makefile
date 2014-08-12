TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 10000

install:
	@npm install

test:
	"./node_modules/.bin/mocha.cmd" \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(TESTS)



.PHONY: install test
