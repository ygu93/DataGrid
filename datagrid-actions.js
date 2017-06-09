// show and hide columns based on dropdown selection
export function showColumns(e){
  e.preventDefault();
  let checkBoxes = e.target.getElementsByTagName('input');
  if(Array.from(checkBoxes).filter(box => box.checked).length === 0){
    alert('must choose to display at least one field');
    return;
  }
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
export function sortTable(n, name, e){
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
