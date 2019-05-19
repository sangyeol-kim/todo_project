const mongoose = require("mongoose");

module.exports = () => {
  //모듈이 실행될 때
  const connect = () => {
    if (process.env.NODE_ENV != "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      process.env.MONGO_URI,
      { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS },
      error => {
        if (error) {
          console.log("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.error("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("dicsonnected", error => {
    console.error("몽고디비 재연결");
    connect();
  });
};
