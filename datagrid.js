import { addSelectorEvents, showColumns, sortTable } from './datagrid-actions.js';

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
      if(Array.isArray(country[dataKey])){
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
        if(dataKey === "Comments"){
          rowData.style.display = 'none';
        }
        row.appendChild(rowData);
      }
    })
    body.appendChild(row);
  })
  addSelectorEvents()
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
    if(i > 5){
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
  let i = 0;

  Object.keys(dataJson["1"]).forEach(key => {
    let input = document.createElement('input');
    input.type = "checkbox";
    key = key.split(/(?=[A-Z])/).join(' ');
    input.value = key;
    if(key !== 'Comments'){
      input.checked = true;
    }else{
      input.disabled = true;
    }

    // event listener to check to disable other check boxes when max column selection is reached
    input.addEventListener('change', () => {
      let maxChecks = 6;
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
          box.parentNode.style.color = "rgb(214, 221, 235)"
        })
      }else{
        checkBoxes.forEach(box => {
          box.disabled = false;
          box.parentNode.style.color = "rgb(54,92,127)"
        })
      }
    })
    let label = document.createElement('label');
    let labelName = document.createTextNode(`${key}`);
    if(key === 'Comments'){
      label.style.color = "rgb(214, 221, 235)"
    }
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
