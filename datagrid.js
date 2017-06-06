
export function renderGrid(){
  let data = require('./data.json');
  let keys = Object.keys(data);
  let body = document.getElementById('grid-body')
  createColumns();
  keys.forEach(key => {
    let country = data[key];
    let countryKeys = Object.keys(country);
    let row = document.createElement("div");
    row.className = "grid-data-item";

    countryKeys.forEach(dataKey => {
      let columnValue = country[dataKey];
      if(typeof columnValue === 'number'){
        columnValue = columnValue.toLocaleString();
        columnValue = '$' + columnValue;
      }
      if(dataKey === "BestCase" || dataKey === "Commit"){
        let i = 0
        let rowData = document.createElement("ul");
        rowData.className = 'grid-cell';

        while(i < 2){
          let rowDataItem = document.createElement("li");
          let rowDataValue = document.createTextNode(`$${columnValue[i].toLocaleString()}`);
          if(i === 1){
            rowDataItem.className = `grid-data-${dataKey.toLowerCase()} more`;
          }else{
            rowDataItem.className = `grid-data-${dataKey.toLowerCase()}`
          }
          rowDataItem.appendChild(rowDataValue);
          rowData.appendChild(rowDataItem)
          i+=1;
        }
        row.appendChild(rowData);
      }else{
        let rowData = document.createElement("div");
        rowData.className = `grid-data-${dataKey.toLowerCase()} grid-cell`;
        let rowDataValue = document.createTextNode(`${columnValue}`);
        rowData.appendChild(rowDataValue);
        if(dataKey === "MonthlyPlan" || dataKey === "Comments"){
          rowData.style.display = 'none';
        }
        row.appendChild(rowData);
      }
    })
    body.appendChild(row);
  })
}

function createColumns(){
  let header = document.getElementById('grid-head')
  let headerRow = document.createElement('div');
  headerRow.className = "grid-header-row";
  let columnNames = ["NAME", "PLAN", "FORECAST", "BEST CASE", "COMMIT", "MONTHLY PLAN", "COMMENTS"];
  columnNames.forEach(name => {
    let column = document.createElement('div');
    let columnName = document.createTextNode(`${name}`);
    if(name === "MONTHLY PLAN" || name === "COMMENTS"){
      column.style.display = "None";
    }
    column.appendChild(columnName);
    column.className = "grid-cell";
    headerRow.appendChild(column);
  })
  header.appendChild(headerRow);
}

export function addSelectorEvents(){
  let selectors = document.getElementsByTagName('input');
  selectors = Array.from(selectors);
  selectors = selectors.filter((node) => node.value === 'More' || node.value === 'Less');
  selectors.forEach(selector => {
    if(selector.value === 'More'){
      selector.addEventListener('click', () => {
        let elements = document.getElementsByClassName('more');
        elements = Array.from(elements);
        elements.forEach(element => {
          element.style.display = 'block';
        })
      })
    }else{
      selector.addEventListener('click', () => {
        let elements = document.getElementsByClassName('more');
        elements = Array.from(elements);
        elements.forEach(element => {
          element.style.display = 'none';
        })
      })
    }
  })
}
