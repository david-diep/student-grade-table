var gradeTable = new GradeTable(document.querySelector(".table"));
var pageHeader = new PageHeader(document.querySelector(".header"));
var gradeForm = new GradeForm(document.querySelector(".form-group"));
var test = new App(gradeTable, pageHeader,gradeForm);
test.start();
