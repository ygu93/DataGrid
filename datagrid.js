// renders datagrid

export function renderGrid(){
  renderDropDown();
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

// renders columns of the datagrid
function createColumns(){
  let header = document.getElementById('grid-head')
  let headerRow = document.createElement('div');
  headerRow.className = "grid-header-row";
  let dataJson = require('./data.json')
  let columnNames = Object.keys(dataJson["1"])
  columnNames.forEach((name, i) => {
    let column = document.createElement('div');
    column.addEventListener('click', function(e){ sortTable(i, name, e); });
    name = name.split(/(?=[A-Z])/).join(' ');
    let columnName = document.createTextNode(`${name.toUpperCase()}`);
    if(i > 4){
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

// renders dropdown menu
function renderDropDown(){
  let dataGrid = document.getElementById('data-grid');
  let icon = document.createElement('i');
  icon.className = "fa fa-caret-square-o-down";
  icon.addEventListener('click', () => {
    let dropDown = document.getElementById('drop-down');
    dropDown.style.display === 'block' ? dropDown.style.display = 'none' : dropDown.style.display = 'block';
  })
  dataGrid.appendChild(icon);

  let menu = document.createElement('form');
  menu.id = "drop-down";
  let header = document.createElement('h3');
  header.appendChild(document.createTextNode('SELECTED FIELDS'))
  menu.appendChild(header);
  let fieldOptions = document.createElement('ul');
  menu.appendChild(fieldOptions);

  let dataJson = require('./data.json');
  Object.keys(dataJson["1"]).forEach(key => {
    let input = document.createElement('input');
    input.type = "checkbox";
    key = key.split(/(?=[A-Z])/).join(' ');
    input.value = key;
    input.addEventListener('change', () => {
      let maxChecks = 5;
      let dropDown = document.getElementById('drop-down');
      let checkBoxes = Array.from(dropDown.getElementsByTagName('input'));
      let currentChecks = 0;
      let unchecked = [];
      checkBoxes.forEach(box => {
        if(box.checked === true){
          currentChecks++;
        }else{
          unchecked.push(box);
        }
      })

      if(currentChecks === maxChecks){
        unchecked.forEach(box => {
          box.disabled = true;
        })
      }else{
        checkBoxes.forEach(box => {
          box.disabled = false;
        })
      }
    })
    let label = document.createElement('label');
    let labelName = document.createTextNode(`${key}`);
    label.appendChild(input)
    label.appendChild(labelName)
    let listElement = document.createElement('li');
    listElement.appendChild(label);
    fieldOptions.appendChild(listElement)
  })

  let button = document.createElement('button');
  button.appendChild(document.createTextNode('Apply'));
  menu.appendChild(button)
  menu.addEventListener('submit', showColumns)
  dataGrid.appendChild(menu);

}

function showColumns(e){
  e.preventDefault();
  let checkBoxes = e.target.getElementsByTagName('input');
  let columns = document.getElementById('grid-head').getElementsByClassName('grid-cell');
  let rows = document.getElementsByClassName('grid-data-item');
  for (let i = 0; i < checkBoxes.length; i++) {
    if(checkBoxes[i].checked){
      columns[i].style.display = 'inline-block';

      for (var j = 0; j < rows.length; j++) {
        rows[j].childNodes[i].style.display = 'inline-block';
      }
    }else{
      columns[i].style.display = 'none';
      for (var j = 0; j < rows.length; j++) {
        rows[j].childNodes[i].style.display = 'none';
      }
    }
  }
  let dropDown = document.getElementById('drop-down');
  dropDown.style.display = 'none';
}
// adds event listeners for more/less radio buttons
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

// logic for sorting tables by column name
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

      if(name ===  'Comments' || name === 'Name'){
        value1 = value1.innerHTML;
      }else{
        value1 = convertToNum(value1.innerHTML.slice(1));
      }


      if(name !== 'Comments' && name !== 'Name'){
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
    if(e.target.tagName === 'I'){
      e.target.className = 'fa fa-sort-asc';
    }else{
      e.target.getElementsByTagName('i')[0].className = 'fa fa-sort-asc';
    }
  }else if(dir === "desc"){
    if(e.target.tagName === "I"){
      e.target.className = 'fa fa-sort-asc';
    }else{
      e.target.getElementsByTagName('i')[0].className = 'fa fa-sort-desc';
    }
  }
}

// helper method for sorting
function convertToNum(str){
  return parseInt(str.split(',').join(''));
}
