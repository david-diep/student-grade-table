var gradeTable = new GradeTable(document.querySelector(".table-body"));
var pageHeader = new PageHeader(document.querySelector(".avg"));
var test = new App(gradeTable, pageHeader);
test.start();
