class GradeTable{
  constructor(tableElement){
    this.tableElement = tableElement;
  }
  updateGrades(grades){
    //console.log( grades);

    for (let i = 0; i < grades.length; i++){
      var tableBody = this.tableElement.querySelector("tbody");
      var row = document.createElement("tr");
      var nameBox = document.createElement("td");
      nameBox.textContent = grades[i].name;
      row.appendChild(nameBox);
      var courseBox = document.createElement("td");
      courseBox.textContent = grades[i].course;
      row.appendChild(courseBox);
      var gradeBox = document.createElement("td");
      gradeBox.textContent = grades[i].grade;
      row.appendChild(gradeBox);
      tableBody.appendChild(row);
    }

  }
}
