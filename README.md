# To-do with SPA (Node.js + Express.js + Vue.js + MongoDB)

[🚀 Demo Application Link](http://54.180.97.56:3000/)

**사용 팁**
- 사용자의 선택에 따라 우선순위와 데드라인을 설정할 수 있습니다.
- 테이블의 우선순위와 데드라인을 클릭하면 정렬된 결과를 볼 수 있습니다. 기본 정렬 방식은 생성한 시간입니다.
- 테이블의 완료 체크박스를 클릭하면 작성된 To-do를 완료 상태로 변경할 수 있습니다.
- 데드라인이 마감된 To-do에는 **무서운** 이모티콘과 함께 "마감"이라는 단어가 함께 표시됩니다.
- "칰"을 입력하면 치킨 이모티콘을 사용할 수 있습니다. (폰트 저작권은 배민 한나체Pro에 있습니다.)

**요구 사항**
- Node 10
- NPM 6.4.1
- MongoDB 4.0

해당 프로젝트는 Node(10.15.3), NPM(6.4.1), MongoDB(4.0.2) 버전을 기준으로 작성되었습니다.

## 세팅 및 배포
해당 가이드는 Ubuntu 18.04를 기준으로 작성되었습니다. 가이드에 문제가 있다면 이슈를 남겨주세요!

**1. Node, NPM 설치**

```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ sudo npm install -g npm
```

**2. app 폴더 생성 후 github 프로젝트 가져오기**

```
$ mkdir app
$ cd app
$ git clone https://github.com/sangyeol-kim/todo_project.git
$ cd todo_project
```

**3. MongoDB 설치**

```
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
$ echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org=4.0.2 mongodb-org-server=4.0.2 mongodb-org-shell=4.0.2 mongodb-org-mongos=4.0.2 mongodb-org-tools=4.0.2
```

**4. Mongo demon 실행**

```
$ sudo service mongod start
```

**5. MongoDB root 계정 생성**

```
$ mongo
> use admin
> db.createUser({user: "admin_user", pwd: "admin_pass", roles:["root"]});
> exit
```

**6. MongoDB config 수정**

```
$ sudo vi /etc/mongod.conf
// i :텍스트 삽입, esc :명령 모드로 진입, :wq :저장 후 종료

// mongod.conf 파일을 다음과 같이 수정해주세요.
# mongod.conf
# ...

net:
  port: 27017
  bindIp: 0.0.0.0

# ...

security:
  authorization: 'enabled'

# ...

$ sudo service mongod restart
```

**7. root 계정으로 Mongo shell 접속**

```
$ mongo -u "admin_user" -p "admin_pass"
```

**8. 데이터베이스, 일반 유저 생성**

```
> use TodoDB
> db.createUser({user: "dev_user", pwd:"dev_pass", roles:["readWrite"]});
> exit
```

**9. clone한 프로젝트 폴더의 Npm 의존성 설치**

```
$ cd backend
$ npm i
$ cd ../frontend
$ npm i
```

**10. 환경변수 사용을 위한 .env 파일 생성 및 수정.**

```
$ cd ../backend
$ touch .env
$ vi .env

// .env 파일을 다음과 같이 수정해주세요.
PORT=3000
MONGO_URI="mongodb://<ec2_instance_public_ip>/TodoDB"
MONGO_USER = "dev_user"
MONGO_PASS = "dev_pass"
```

**11. PM2 설치 및 실행**

일반적으로 node.js 어플리케이션을 구동하기 위해서 개발 환경에서는 nodemon 또는 node app.js 명령어를 통해 서버를 실행합니다.  
PM2는 에러가 발생했을 때 노드 서버가 강제로 다운되는 현상이 일어났을 때 자동으로 서버를 재 실행해주고, 데몬으로 동작하는 등의 장점을 가지고 있기 때문에 배포 환경에서 많이 사용됩니다. 그 외의 자세한 설명은 다음 링크를 참고해주세요. [PM2 자세히 보기](https://www.npmjs.com/package/pm2)

```
$ sudo npm i pm2 -g
$ npm start
```
> backend 폴더의 package.json을 확인해보시면 이미 start script에 pm2 start app.js가 등록되어 있습니다.

**12. 배포한 서버에 접속**

localhost://3000으로 접속하면 배포한 SPA를 확인할 수 있습니다.  

## 과제 요구사항
기능 요구사항

- [x] 새로운 TODO(제목과 내용)를 작성할 수 있다.
  - POST /api/todos
- [x] TODO 목록을 볼 수 있다.
  - GET /api/todos
- [x] TODO 항목의 제목과 내용을 수정할 수 있다.
  - PUT /api/todos/:id
- [x] TODO 항목을 삭제할 수 있다.
  - DELETE /api/todos/:id
- [x] 사용자의 선택에 의해 TODO에는 마감 기한을 넣을 수 있다.
  - POST /api/todos
- [x] TODO 항목의 우선순위를 설정 및 조절할 수 있다.
  - POST /api/todos
  - PUT /api/todos/:id
- [x] TODO 항목에 대한 완료 처리를 할 수 있다.
  - PUT /api/todos/complete/:id
- [x] 마감기한이 지난 TODO에 대해 알림을 노출할 수 있다.
  - GET /api/todos

제출물

- [x] 소스 코드가 담긴 github URL
  - [Project Repository](https://github.com/sangyeol-kim/todo_project)
- [x] 접속하여 테스트 가능한 URL
  - [Demo Application on AWS](http://54.180.97.56:3000/)

## 개선사항

- 소켓 등을 사용한 실시간 알림 기능 구현
- 반응형을 포함한 UI/UX 개선

## 감사합니다.

