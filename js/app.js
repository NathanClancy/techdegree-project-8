const url = "https://randomuser.me/api/?results=12&nat=us,au,ca,ch,de,gb,fr&inc=name, picture,email, location, phone, dob, nat & noinfo";
let index = 0;
const employees = [];


// importing 12 employees from https://randomuser.me
 function generateData() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      generateEmployees(results);
      console.log(results);
    })
    .catch(error => console.log("Oops! Something went wrong.", error))
}

// Employee objects are added to the employees array thumbnails are generated
function generateEmployees(data) {
  let html = [];
  let index = 0;
  data.map(result => {
    let name = `${changeCase(result.name.first)} ${changeCase(result.name.last)}`;
    let city = changeCase(result.location.city);
    const thumbnail = `
      <section class="employee-card" data-index=${index}><img class="employee-img" src=${result.picture.large}>
      <div class="card">
      <h2>${name}</h2>
      <p>${result.email.toLowerCase()}</p>
      <p>${city}</p>
      </div>
      </section>`;
    html += thumbnail;
	  
	  // generate the employee objects
    const employee = {
      index,
      name,
      city,
      phone: result.phone,
      email: result.email.toLowerCase(),
      street: `${result.location.street.number} ${changeCase(result.location.street.name)}`,
      nationality: result.nat.toUpperCase(),
      zipCode: result.location.postcode,
      image: result.picture.large,
      birthday: new Date(result.dob.date)
    }
    index += 1;
    // add the employee to the employees array
    employees.push(employee);
  });
  list.innerHTML = html;
}