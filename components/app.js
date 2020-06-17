class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
  }
  handleGetGradesError(error) {
    console.log(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);

    let average = 0;
    for (let i = 0; i < grades.length; i++) {
      average += grades[i].grade;
    }
    average = average/grades.length;
    this.pageHeader.updateAverage(average);

  }//end of handle success


  getGrades() {
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: { "X-Access-Token": "HikRbc2E" },
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError
    });
  }

  start() {
    this.getGrades();
  }

}
