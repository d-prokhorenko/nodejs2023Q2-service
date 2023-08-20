run:
	docker run -d -p 4000:4000 --env-file ./.env --rm --name nodeservice r1skd/nodeservice
run-dev:
	docker run -d -p 4000:4000 -v "D:\Study\Backend\Courses\RSShool\NodeJs-2023Q2\nodejs2023Q2-service:/app" -v /app/node_modules --env-file ./.env --rm --name nodeservice r1skd/nodeservice
stop:
	docker stop r1skd/nodeservice