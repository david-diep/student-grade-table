class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.handleEditGradeSuccess = this.handleEditGradeSuccess.bind(this);
    this.handleEditGradeError = this.handleEditGradeError.bind(this);
    this.getGrades = this.getGrades.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.editClick = this.editClick.bind(this);
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
  }


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
    average = average / grades.length;
    average = Math.round(10 * average) / 10; // round to nearest tenth
    this.pageHeader.updateAverage(average);

  }//end of handle success


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

  editClick(data){
    this.gradeForm.addToEdit(data);
  }

  editGrade(name, course, grade){
    var id = this.gradeForm.editID;
    this.gradeForm.editID=null;
    this.gradeForm.editToAdd();
    console.log("editGrade: ", name, course, grade, id); //name, course, grade, id
    $.ajax({
      method: "PATCH",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: { "X-Access-Token": "HikRbc2E" },
      success: this.handleEditGradeSuccess,
      error: this.handleEditGradeError,
      data: {
        "name": name,
        "course": course,
        "grade": grade
    }
    });
  }
  handleEditGradeError(error) {
    console.log(error);
  }
  handleEditGradeSuccess(data) {//data is the one student being edited
    console.log("Grade Editted Successfully:", data);
    this.getGrades();
  }

  start() {
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onEditClick(this.editClick);
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeForm.onEdit(this.editGrade);
    this.getGrades();
  }
}
