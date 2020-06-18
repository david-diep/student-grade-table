class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.getGrades = this.getGrades.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
  }
  handleGetGradesError(error) {
    console.log(error);
  }
  handleGetGradesSuccess(grades) {
    //console.log("get grade success")
    this.gradeTable.updateGrades(grades);

    let average = 0;
    for (let i = 0; i < grades.length; i++) {
      average += grades[i].grade;
    }
    average = average/grades.length;
    average = Math.round(10 * average) / 10; // round to nearest tenth
    this.pageHeader.updateAverage(average);

  }//end of handle success

  createGrade(name,course,grade){
    $.ajax({
      method:"POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: { "X-Access-Token": "HikRbc2E" },
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError,
      data:{
        "name": name,
        "course": course,
        "grade": grade
      }
    })
  }
  handleCreateGradeError(error){
    console.log( error);
  }
  handleCreateGradeSuccess(){
    this.getGrades();
  }

  getGrades() {
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: { "X-Access-Token": "HikRbc2E" },
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError
    });
  }



  deleteGrade(id){
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/"+id,
      headers: { "X-Access-Token": "HikRbc2E" },
      success: this.handleDeleteGradeSuccess,
      error: this.handleDeleteGradeError
    });
  }

  handleDeleteGradeError(error){
    console.log( error);
  }
  handleDeleteGradeSuccess(){
    this.getGrades();
  }

  start() {
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeForm.onSubmit(this.createGrade);
    this.getGrades();
  }
}
