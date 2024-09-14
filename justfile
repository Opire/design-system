SERVICE := 'opire_design_system'

[private]
alias i := install

[private]
[doc('
    List all available commands.
    ex:
        just
')]
default:
    @just --list

[doc('
    Install the project dependencies.
    ex:
        just install
        just i
')]
install:
    @docker compose run --rm {{SERVICE}} npm install
    
[doc('
    Add a new dependency to the project.
    ex:
        just add "package"
        just add "package1 package2"
        just add "-D dev-package"
')]
add deps:
    @docker compose run --rm {{SERVICE}} npm install {{deps}}

[doc('
    Run the project in development mode.
    ex:
        just dev
')]
dev:
    @docker compose run --rm --service-ports {{SERVICE}} npm run dev

[doc('
    Build the library.
    ex:
        just build-lib
')]
build-lib:
	@docker compose run --rm {{SERVICE}} npm run build:lib

[doc('
    Build the storybook project.
    ex:
        just build-storybook
')]
build-storybook:
	@docker compose run --rm {{SERVICE}} npm run build:storybook

[doc('
    Run the linter.
    ex:
        just lint
')]
lint:
	@docker compose run --rm {{SERVICE}} npm run lint

[doc('
    Run the linter and fix the issues.
    ex:
        just lint-fix
')]
lint-fix:
	@docker compose run --rm {{SERVICE}} npm run lint:fix

[doc('
    Run the tests.
    ex:
        just test
')]
test:
	@docker compose run --rm {{SERVICE}} npm run test

[doc('
    Run the tests in watch mode.
    ex:
        just test-watch
')]
test-watch:
	@docker compose run --rm {{SERVICE}} npm run test:watch
