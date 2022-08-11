const inputBtn = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const saveBtn = document.getElementById('save-btn');

// Array will hold leads
let myLeads = [];

// Grabs the leads from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

// If leads from local is truthy
if (leadsFromLocalStorage) {
  // set leads array to leads from local
  myLeads = leadsFromLocalStorage;
  // Display leads
  render(myLeads);
}

saveBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });
});

// Displays leads
function render(leads) {
  // Clears the list items
  let listItems = '';
  // Displauy leads on page
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
              <a href='${leads[i]}' target='_blank'> ${leads[i]} 
              </a>
          </li>`;
  }
  ulEl.innerHTML = listItems;
}

// Input button
inputBtn.addEventListener('click', function () {
  // Push leads into myLeads arr
  myLeads.push(inputEl.value);
  // Clears the input value
  inputEl.value = '';
  // Sets myLeads arr to local storage
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
});

// Delete button
deleteBtn.addEventListener('dblclick', function () {
  // Clears the local
  localStorage.clear();
  // Clears the arrray
  myLeads = [];
  // Displays the leads
  render(myLeads);
});
