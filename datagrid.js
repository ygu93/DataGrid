
export function renderGrid(){
  renderDropDownIcon();
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
        let rowData = document.createElement("div");
        rowData.className = `grid-cell grid-data-${dataKey.toLowerCase()}`;

        while(i < 2){
          let rowDataItem = document.createElement("li");
          let rowDataValue = document.createTextNode(`$${columnValue[i].toLocaleString()}`);
          if(i === 1){
            rowDataItem.className = 'more';
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
  columnNames.forEach((name, i) => {
    let column = document.createElement('div');
    column.addEventListener('click', function(e){ sortTable(i, name, e); });
    let columnName = document.createTextNode(`${name}`);
    if(name === "MONTHLY PLAN" || name === "COMMENTS"){
      column.style.display = "None";
    }
    column.appendChild(columnName);
    let sortIcon = document.createElement('i');
    sortIcon.className = 'fa fa-sort';
    column.appendChild(sortIcon);
    column.className = "grid-cell";
    headerRow.appendChild(column);
  })
  header.appendChild(headerRow);
}

function renderDropDownIcon(){
  let dataGrid = document.getElementById('data-grid');
  let icon = document.createElement('i');
  icon.className = "fa fa-caret-square-o-down fa-2x";
  dataGrid.appendChild(icon);
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

function sortTable(n, name, e){
  let table, rows, swapped, i, value1, value2, shouldSwap, dir, swapCount = 0;
  table = document.getElementById('data-grid');
  dir = "asc";
  swapped = true;

  while(swapped){
    swapped = false;
    rows = document.getElementsByClassName('grid-data-item');
    shouldSwap = false;


    for(i=0;i<(rows.length-1);i++){
      value1 = rows[i].getElementsByTagName("div")[n];
      value2 = rows[i + 1].getElementsByTagName("div")[n];

      if(value1.className.includes('grid-data-commit') || value1.className.includes('grid-data-bestcase')){
        value1 = value1.getElementsByTagName('li')[0];
      }

      if(value2.className.includes('grid-data-commit') || value2.className.includes('grid-data-bestcase')){
        value2 = value2.getElementsByTagName('li')[0];
      }

      if(name !==  'COMMENTS' && name!== 'NAME'){
        value1 = convertToNum(value1.innerHTML.slice(1));
      }else{
        value1 = value1.innerHTML;
      }

      if(name !== 'COMMENTS' && name !== 'NAME'){
        value2 = convertToNum(value2.innerHTML.slice(1));
      }else{
        value2 = value2.innerHTML;
      }

      if(dir === "asc"){
        if(value1 > value2){
          shouldSwap = true;
          break;
        }
      }else if(dir == "desc"){
        if(value1 < value2){
          shouldSwap = true;
          break;
        }
      }
    }

    if(shouldSwap){
      rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
      swapped = true;
      swapCount ++;
    }else{
      if(swapCount === 0 && dir === "asc") {
        dir = "desc";
        swapped = true;
      }
    }

  }
  if(dir === "asc"){
    e.target.getElementsByTagName('i')[0].className = 'fa fa-sort-asc';
  }else if(dir === "desc"){
    e.target.getElementsByTagName('i')[0].className = 'fa fa-sort-desc';
  }
}

function convertToNum(str){
  return parseInt(str.split(',').join(''));
}
