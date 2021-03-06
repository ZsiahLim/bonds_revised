
//call this function when window load
$(document).ready(function () {
    buildUserContent('#UserTableBody')
    buildRequestContent('#RequestTableBody')

    buildTable('#UserTable')
    buildTable('#RequestTable')
})

// Resident Data List
var residents = [
    { photo: "assets/images/admin.png", unit: "A-01-03", name: "Lim Ah Tong", IC: "010201-07-0111", contact: "016-1286028", emergency: "012-1286028", gender: 'F', dateIn: Date(), password: "unit" },
    { photo: "assets/images/biolab.jpg", unit: "B-01-03", name: "Lim Mah Tong", IC: "010201-07-0231", contact: "012-1286028", emergency: "012-1286023", gender: 'F', dateIn: Date(), password: "unit" },
    { photo: "assets/images/profile-image.png", unit: "D-02-13", name: "Kee Jia Tong", IC: "010228-07-0111", contact: "014-1286028", emergency: "012-1286497", gender: 'F', dateIn: Date(), password: "unit" },
    { photo: "assets/images/logo.png", unit: "A-01-09", name: "Bee Jia Ying", IC: "011201-07-0141", contact: "010-21286028", emergency: "012-1286666", gender: 'F', dateIn: Date(), password: "unit" },
    { photo: "assets/images/admin.png", unit: "C-01-03", name: "Ahmad Ali", IC: "981010-07-0211", contact: "018-3126028", emergency: "012-1286322", gender: 'M', dateIn: Date(), password: "unit" }
]

// Request Data List
var requests = [{ unit: "B-01-03", debt: 1050, date: Date() }, { unit: "A-01-09", debt: 0, date: Date() }]

function buildTable(tableID) {
    //initialize datatable
    $(tableID).DataTable({
        // "scrollX": "100%", 这个我用了我的table不align去 我改成下面这个就ok了
        "initComplete": function (settings, json) {
            $(tableID).wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        "scrollCollapse": true,
        language: {
            paginate: {
                next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
                previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>'
            }
        }
    })
}

function rebuildTable(tableID) {
    $(tableID).DataTable().destroy();
    console.log(tableID)
    if (tableID === '#UserTable') {
        buildUserContent('#UserTableBody')
    } else {
        buildRequestContent('#RequestTableBody')
    }
    buildTable(tableID)
}


function buildUserContent(tableBody) {
    $(tableBody).empty() //clear the html first
    console.log(residents.length)
    for (resident of residents) {
        //用template literal (``) 来一次过include所有html 和 string. 用${} 来写 variable
        newRow =
            `<tr onclick="editRow('${resident.unit}')">
                <td> ${resident.unit} </td>
                <td> ${resident.name} </td>
                <td> ${resident.gender} </td>
                <td> ${resident.IC} </td>
                <td> ${resident.contact} </td>                    
                <td> ${resident.emergency} </td>
                <td><button type="button" class="btn" onclick="editRow('${resident.unit}')"><i class="bi bi-pencil-square text-primary"></i></button>
                <button type="button" class="btn" onclick="deleteUser('${resident.unit}')"><i class="bi bi-trash3 text-danger"></i></button>
                </td>
            </tr>
            `
        $(tableBody).append(newRow)
    }
}


function buildRequestContent(tableBody) {
    $(tableBody).empty() //clear the html first
    console.log(requests.length)
    for (request of requests) {
        //match id to get residents data
        for (resident of residents) {
            if (resident.unit === request.unit) {
                var name = resident.name
                var contact = resident.contact
            }
        }
        //用template literal (``) 来一次过include所有html 和 string. 用${} 来写 variable
        newRow =
            `<tr onclick="editRow('${request.unit}')">
                <td> ${request.unit} </td>
                <td> ${name} </td>
                <td> ${request.debt} </td>
                <td> ${request.date} </td>
                <td> ${contact} </td>                   
                <td><button type="button" class="btn" onclick="approveDeletion('${request.unit}')"><i class="bi bi-check-square text-primary"></i></button>
                </td>
            </tr>
            `
        $(tableBody).append(newRow)
    }
}

function buildModal() {
    $('#ModalBody').empty() //clear the html first
    newBody =
        `<form id="form">
            <div class="mb-3">
                <label for="unit" class="col-form-label">Unit:</label>
                <input type="text" class="form-control" id="unit" required>
            </div>
            <div class="mb-3">
                <label for="name" class="col-form-label">Resident Name:</label>
                <input type="text" class="form-control" id="name" required>
            </div>
            <div class="mb-3">
                <label for="gender" class="col-form-label">Gender:</label>
                <input type="radio" id="F" name="gender" value="F">
                <label for="F">Female</label>
                <input type="radio" id="M" name="gender" value="M">
                <label for="M">Male</label>
            </div>
            <div class="mb-3">
                <label for="ic" class="col-form-label">IC Number: (YYMMDD-XX-XXXX)</label>
                <input type="text" class="form-control" id="ic" pattern="[0-9]{6}-[0-9]{2}-[0-9]{4}" required placeholder="010616-14-1303">
            </div>
            <div class="mb-3">
                <label for="contact" class="col-form-label">Phone Number:</label>
                <input type="text" class="form-control" id="contact" required>
            </div>
                <div class="mb-3">
                <label for="date-move-in" class="col-form-label">Date Move In:</label>
                <input type="datetime-local" class="form-control" id="date-move-in" required>
            </div>
            <div class="mb-3">
                <label for="emergency" class="col-form-label">Emergency Phone Number: </label>
                <input type="text" class="form-control" id="emergency" required>
            </div>
            <div class="mb-3">
                <label for="password" class="col-form-label">Password: </label>
                <input type="password" class="form-control" id="password" required>
            </div>
            <input type="submit"  class="me-lg-3 btn btn-primary" id="submit">
        </form> `
    $('#ModalBody').append(newBody)
}

function deleteUser(unit) {
    if (confirm(`Delete User account with id: ${unit}?`)) {
        deleteRow(unit, residents, '#UserTable')
    }
}

function approveDeletion(unit) {
    if (confirm(`Stop rental with : ${unit}?`)) {
        deleteRow(unit, residents, '#UserTable')
        deleteRow(unit, requests, '#RequestTable')
    }
}

function deleteRow(unit, array, tableID) {
    event.stopPropagation();//stop the propagation (按了editbuton后，不会再trigger Row 的onclick)
    console.log(array);
    console.log("unit is: " + unit);
    array.forEach(function (resident, index) {
        console.log('index:' + index + ' resident' + resident.unit);
        if (resident.unit == unit) {
            array.splice(index, 1); //remove the object from array
            rebuildTable(tableID)
        }
    });

}

function getGender(gender, selection) {
    if (gender === 'F') {
        selection += ' input[id="F"]'
        $(selection).prop('checked', true);
    }
    else {
        selection += ' input[id="M"]'
        $(selection).prop('checked', true);
    }
}

function editRow(unit) {
    event.stopPropagation();

    //building and showing modal
    buildModal();
    $('#Modal').on('show.bs.modal', function () {
        $('#AddModalLabel').text('Update Resident: ');
    });
    $('#Modal').modal('show');

    //show 本来的value
    console.log("EDIT ROW called")
    for (resident of residents) {
        if (resident.unit === unit) {
            $('#Modal input[id="unit"]').val(resident.unit)
            $('#Modal input[id="unit"]').prop("disabled", true)
            $('#Modal input[id="name"]').val(resident.name)
            $('#Modal input[id="ic"]').val(resident.IC)
            $('#Modal input[id="contact"]').val(resident.contact)
            $('#Modal input[id="emergency"]').val(resident.emergency)
            $('#Modal input[id="date-move-in"]').val(resident.dateIn)
            $('#Modal input[id="date-move-in"]').prop("disabled", true)
            $('#Modal input[id="password"]').val(resident.password)
            getGender(resident.gender, '#Modal')
        }
    }

    $("#form").submit(function (e) {
        console.log("editRow called")
        updateResident(unit)
        e.preventDefault();
    })
}

function updateResident(unit) {
    var name = $('#Modal input[id="name"]').val()
    var IC = $('#Modal input[id="ic"]').val()
    var contact = $('#Modal input[id="contact"]').val()
    var emergency = $('#Modal input[id="emergency"]').val()
    var gender = $("#Modal input[name='gender']:checked").val();
    var password = $('#Modal input[id="password"]').val();

    for (resident of residents) {

        if (resident.unit === unit) {
            resident.name = name,
                resident.IC = IC,
                resident.gender = gender,
                resident.contact = contact,
                resident.emergency = emergency
            resident.password = password
            alert(name + IC + contact + emergency + gender);

            rebuildTable('#UserTable')
            rebuildTable('#RequestTable')
        }
    }
}


function addRow() {
    console.log("addRow called")

    //building and showing modal
    buildModal();
    $('#Modal').on('show.bs.modal', function () {
        $('#AddModalLabel').text('Add New Resident: ');
    });
    $('#Modal').modal('show');

    // Submit Form
    $("#form").submit(function (e) {

        var newResident = {}

        var photo = "assets/images/profile-image.png"
        var unit = $('input[id="unit"]').val()
        var name = $('input[id="name"]').val()
        var IC = $('input[id="ic"]').val()
        var contact = $('input[id="contact"]').val()
        var emergency = $('input[id="emergency"]').val()
        var gender = $("input[name='gender']:checked").val();
        var password = $('input[id="password"]').val();

        var dateIn = new Date();



        if (photo === '' || unit === '' || name === '' || IC === '' || contact === '' || emergency === '' || gender === '' || dateIn === '' || password === '') {
            alert("All fields must have a valid value.");
        } else {
            //create new object
            newResident = {
                photo: photo,
                unit: unit,
                name: name,
                IC: IC,
                contact: contact,
                emergency: emergency,
                gender: gender,
                dateIn: dateIn,
                password: password
            }

            //insert into main list
            residents.push(newResident)
            //call build row
            rebuildTable('#UserTable')
            $("#form").trigger("reset");
        }
        e.preventDefault();
    });

}
