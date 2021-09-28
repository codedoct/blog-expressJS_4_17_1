run_setup:
	cp .env.example .env
	npm install

run_local:
	nodemon server.js

run_pm2:
	pm2 start blog-expressjs_4_17_1

stop_pm2:
	pm2 stop blog-expressjs_4_17_1

reload_pm2:
	pm2 reload blog-expressjs_4_17_1
