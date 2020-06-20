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
    const tableBody = this.tableElement.querySelector("tbody");
    while(tableBody.lastChild){
      tableBody.removeChild(tableBody.lastChild);
    }
    for (let i = 0; i < grades.length; i++){

      const row = this.renderGradeRow(grades[i], this.deleteGrade, this.editClick);
      tableBody.appendChild(row);
    }

  }

  onDeleteClick(deleteGrade){
    this.deleteGrade = deleteGrade;
  }
  onEditClick(editClick){
    this.editClick = editClick;
  }

  renderGradeRow(data, deleteGrade, editClick){
    const row = document.createElement("tr");
    const nameBox = document.createElement("td");
    nameBox.textContent = data.name;
    row.appendChild(nameBox);
    const courseBox = document.createElement("td");
    courseBox.textContent = data.course;
    row.appendChild(courseBox);
    const gradeBox = document.createElement("td");
    gradeBox.textContent = data.grade;
    row.appendChild(gradeBox);
    const oppBox = document.createElement("td");
    const deleteButton = document.createElement("i");
    deleteButton.className="fa fa-trash-alt fa-lg";
    const editButton = document.createElement("i");
    editButton.className = "fa fa-pencil-alt fa-lg";

    deleteButton.addEventListener('click', function () {
      deleteGrade(data.id);
    });

    editButton.addEventListener('click', function(){
      editClick(data);
    });

    oppBox.appendChild(editButton);
    oppBox.appendChild(deleteButton);
    row.appendChild(oppBox);
    return row;

  }
}
