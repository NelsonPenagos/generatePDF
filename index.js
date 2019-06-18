const pdf = require("./util/utilPDF.js");
const exam = require("./models/objectExam.json");

//

pdf.generatePDF(exam[0]);
pdf.generatePDF(exam[1]);

console.log("Generación completa...");
