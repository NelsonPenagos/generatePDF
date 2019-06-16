const pdf = require('./util/utilPDF.js');
const userInfo = require('./models/userExamInfo.json');
const userExam = require('./models/userExamResult.json');

//
pdf.generatePDF(userInfo, userExam)
console.log("Generación completa...")
