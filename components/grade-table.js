class GradeTable{
  constructor(tableElement, noGradesElement){
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }

  updateGrades(grades){

    if(grades.length===0){
      if (this.noGradesElement.classList.contains("d-none")) this.noGradesElement.classList.remove("d-none")
    } else{
      if (!this.noGradesElement.classList.contains("d-none")) this.noGradesElement.classList.add("d-none")
    }
    var tableBody = this.tableElement.querySelector("tbody");
    while(tableBody.lastChild){
      tableBody.removeChild(tableBody.lastChild);
    }
    for (let i = 0; i < grades.length; i++){

      var row = this.renderGradeRow(grades[i], this.deleteGrade);
      tableBody.appendChild(row);
    }

  }

  onDeleteClick(deleteGrade){
    this.deleteGrade = deleteGrade;
  }

  renderGradeRow(data, deleteGrade){
    var row = document.createElement("tr")
    var nameBox = document.createElement("td");
    nameBox.textContent = data.name;
    row.appendChild(nameBox);
    var courseBox = document.createElement("td");
    courseBox.textContent = data.course;
    row.appendChild(courseBox);
    var gradeBox = document.createElement("td");
    gradeBox.textContent = data.grade;
    row.appendChild(gradeBox);
    var oppBox = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.addEventListener('click', function(){
      deleteGrade(data.id);
    });
    deleteButton.textContent = "DELETE";
    deleteButton.className="btn btn-dark";
    oppBox.appendChild(deleteButton);
    row.appendChild(oppBox);
    return row;

  }
}
