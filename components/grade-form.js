class GradeForm{
  constructor(formElement){
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.addToEdit = this.addToEdit.bind(this);
    this.editToAdd = this.editToAdd.bind(this);
    this.formElement.addEventListener("submit",this.handleSubmit);

  }
  onSubmit(createGrade){
    this.createGrade = createGrade;
  }
  onEdit(editGrade){
    this.editGrade = editGrade;
  }
  handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const course = formData.get("course");
    const grade = formData.get("grade");
    event.target.reset();
    this.createGrade(name, course, grade);
  }
  addToEdit(data){
    this.formElement.querySelector("#form-title").textContent = "Edit Grade";
    this.formElement.querySelector("input[name='name']").value = data.name;
    this.formElement.querySelector("input[name='course']").value = data.course;
    this.formElement.querySelector("input[name='grade']").value = data.grade;
    const button = this.formElement.querySelector("#add-edit");
    button.textContent = "Edit";
    button.className = "btn btn-warning";
    this.formElement.removeEventListener("submit",this.handleSubmit);
    this.editID = data.id;
    this.formElement.addEventListener("submit", this.handleEdit);


  } //how do I pass the ID through
  handleEdit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const course = formData.get("course");
    const grade = formData.get("grade");
    event.target.reset();
    this.editGrade(name, course, grade);
  }
  editToAdd(){
    this.formElement.querySelector("#form-title").textContent = "Add Grade";
    const button = this.formElement.querySelector("#add-edit");
    button.textContent = "Add";
    button.className = "btn btn-primary";
    this.formElement.removeEventListener("submit", this.handleEdit);
    this.formElement.addEventListener("submit", this.handleSubmit);
  }
}
