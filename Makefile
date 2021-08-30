run_setup:
	cp .env.example .env
	npm install

run_local:
	nodemon server.js
