let mood = "create";
let tmp;

//create new student
let dataStu;
if (localStorage.student != null) {
  dataStu = JSON.parse(localStorage.student);
} else {
  dataStu = [];
}
submit.onclick = function () {
  let newStu = {
    Name: Name.value.toLowerCase(),
    email: email.value,
    password: password.value,
    address: address.value,
    track: track.value,
    enrollment: enrollment.value,
  };

  if(Name.value != '' && email.value != '' && password.value != '')
  {
    if (mood === "create") {
      if (newStu.count > 1) {
        for (let i = 0; i < newStu.count; i++) {
          dataStu.push(newStu);
        }
      } else {
        dataStu.push(newStu);
      }
    } else {
      dataStu[tmp] = newStu;
      mood = "create";
      submit.innerHTML = "Create";
    }
  }
  


 //save to local storage
  localStorage.setItem("student", JSON.stringify(dataStu));
  console.log(dataStu);
  clearData();
  showData();
};

// clear data after creation
function clearData() {
  Name.value = "";
  email.value = "";
  password.value = "";
  address.value = "";
  track.value = "";
  enrollment.value = "";
}

//Show data in the table
function showData() {
  let table = "";
  for (let i = 0; i < dataStu.length; i++) {
    table += `
        <tr>
            <td>${dataStu[i].Name}</td>
            <td>${dataStu[i].email}</td>
            <td>${dataStu[i].password}</td>
            <td>${dataStu[i].address}</td>
            <td>${dataStu[i].track}</td>
            <td>${dataStu[i].enrollment}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataStu.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete all</button>
        `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//delete student
function deleteData(i) {
  dataStu.splice(i, 1);
  localStorage.student = JSON.stringify(dataStu);
  showData();
}

//delete all
function deleteAll() {
  localStorage.clear();
  dataStu.splice(0);
  showData();
}

//update student data
function updateData(i) {
  Name.value = dataStu[i].Name;
  email.value = dataStu[i].email;
  password.value = dataStu[i].password;
  address.value = dataStu[i].address;
  track.value = dataStu[i].track;
  enrollment.value = dataStu[i].enrollment;
  submit.innerHTML = "Update";

  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search for student
let searchMood = 'Name';

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchName')
    {
        searchMood = 'Name';
        search.placeholder = 'Search for a student';
    }
    search.focus();
    search.value = '';
    showData();
}


function searchData(value)
{
    let table = '';
    if(searchMood == 'Name')
    {
        for(let i = 0; i < dataStu.length; i++)
        {
            if(dataStu[i].Name.includes(value.toLowerCase()))
            {
                table += `
                <tr>
                    <td>${dataStu[i].Name}</td>
                    <td>${dataStu[i].email}</td>
                    <td>${dataStu[i].password}</td>
                    <td>${dataStu[i].address}</td>
                    <td>${dataStu[i].track}</td>
                    <td>${dataStu[i].enrollment}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}