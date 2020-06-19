class PageHeader{
  constructor(headerElement){
    this.headerElement = headerElement;
  }
  updateAverage(newAverage){
    //console.log( this.headerElement)
    const badge = this.headerElement.querySelector("span.badge");
    badge.textContent = newAverage;
  }
}
