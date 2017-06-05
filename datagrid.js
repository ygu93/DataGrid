
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
        while(i < 2){
          let rowDataItem = document.createElement("li");
          let rowDataValue = document.createTextNode(`$${columnValue[i].toLocaleString()}`);
          if(i === 1){
            rowDataItem.className = `grid-data-${dataKey} more`;
          }else{
            rowDataItem.className = `grid-data-${dataKey}`
          }
          rowDataItem.appendChild(rowDataValue);
          rowData.appendChild(rowDataItem)
          i+=1;
        }
        row.appendChild(rowData);
      }else{
        let rowData = document.createElement("div");
        rowData.className = `grid-data-${dataKey}`;
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
  let columnNames = ["Plan", "Forecast", "Best Case", "Commit", "Monthly Plan", "Comments"];
  columnNames.forEach(name => {
    let column = document.createElement('div');
    let columnName = document.createTextNode(`${name}`);
    if(name === "Monthly Plan" || name === "Comments"){
      column.style.display = "None";
    }
    column.appendChild(columnName);
    headerRow.appendChild(column);
  })
  header.appendChild(headerRow);
}
