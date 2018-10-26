$(document).ready(initializeApp);

var studentArray = [];

function initializeApp() {
    addClickHandlersToElements();
    inputEnter();
    searchEnter();
    getDataFromServer();
    $(document).ajaxStart(function () {
        $('.fa-spin').show();
    })
    $(document).ajaxComplete(function () {
        $('.fa-spin').hide();
    })
}

function addClickHandlersToElements() {
    $('.addButton').on('click', handleAddClicked);
    $('.cancel').on('click', handleCancelClick);
    $('.serverData').on('click', () => {getDataFromServer()});

    console.log('Add Click Handlers');


}

function handleAddClicked() {
    console.log('handleAddClick: success')    
    if ($('#studentName').val() === '' || $('#course').val() === '' || $('#studentGrade').val() === '') {
        // alert('Please fill out Name, Course, and Grade!');
        return;
    }    else{
    
    addStudent();
    }
}

function handleCancelClick() {
    clearAddStudentFormInputs();
    console.log('handleCancelClicked: success')
}

function inputEnter() {
    $('input').keydown(function (e) {
        if (e.keyCode == 13) {
            $('.addButton').click();
        }
    });
}

function searchEnter() {
    $('#mySearch').keydown(function (e) {
        if (e.keyCode == 13) {
            $('.searchButton').click();
        }
    });
}

function addStudent() {
    var studentName = $('#studentName').val();
    var course = $('#course').val();
    var grade = $('#studentGrade').val();
    var studentObj = {
        name: studentName,
        course_name: course,
        grade: grade,
        id: studentArray[studentArray.length - 1].id //+ 1
    };

    studentArray.push(studentObj);
    console.log(studentArray);
    clearAddStudentFormInputs();
    updateStudentList();
    sendToServer(studentObj);
}


function clearAddStudentFormInputs() {
    console.log('Clear add student from Inputs');
    // e.preventDefault();


    // $('#submitForm').validate().resetForm();
    // $('#submitForm').find('.error').removeClass('error');


    // $('#submitForm').bootstrapValidator('resetForm', true);
    // $('#submitForm').data('formValidation').resetForm();
    // $('#submitForm').validator('validate');

    $('input:text').val('');
    setTimeout(function(){  $(".has-error").removeClass("has-error");
    $(".help-block li").empty(); }, 0.1);

   

    // $('.list-unstyled').empty();


}

function updateStudentList() {
    renderStudentOnDom(studentArray[studentArray.length - 1]);
    var avgGrade = calculateGradeAverage(studentArray);
    $('.avgGrade').text(avgGrade + "%");
}

function renderStudentOnDom(studentObj) {
    var tableRow = $('<tr>')
    var studentName = $('<td>').text(studentObj.name);
    var studentCourse = $('<td>').text(studentObj.course_name);
    var studentGrade = $('<td>').text(studentObj.grade);
    var editButtonTd = $('<td>');
    var deleteButtonTd = $('<td>');

    var deleteButton = $('<button>', {
        class: 'btn btn-danger btn-responsive',
        text: 'Delete',
        id: studentObj.id
    });
    var editButton = $('<button>', {
        class: 'btn btn-warning btn-responsive',
        text: 'Update',
        id: studentObj.id
    });
    deleteButton.on('click', function () {
        $('#deleteConfirm').modal({
            show: true
        });

        var closestRow = this.closest('tr');
        console.log(closestRow)
        $('.deleteText').text(`Are you sure you want to delete ${studentObj.name}?`)
        $('.confirmDeleteButton').off();

        $('.confirmDeleteButton').on('click', confirmDelete);
        
        function confirmDelete () {
            $(closestRow).remove();
            handleDeleteButton(studentObj);
            deleteStudent(studentObj);
            $('#deleteConfirm').modal('hide')
        }
    });

    editButton.on('click', function () {
        $('#editModal').modal({
            show: true
        });
        console.log(this);
        var studentID = $(this).attr('id');
        var studentName = $(this).attr('studentName')
        $('#editModalHeader').text(`Student to Change: ${studentObj.name}`);
        $('#idHolder').text(studentID);
        $('#saveChanges').off();
        $('#saveChanges').on('click', handleSavedUpdate);
        $('#cancelChanges').on('click', function () {
            $('#editModal').modal('hide');
        });
    })
    
   

    editButtonTd.append(editButton);
    deleteButtonTd.append(deleteButton);
    tableRow.append(studentName, studentCourse, studentGrade, editButtonTd, deleteButtonTd);
    $('tbody').append(tableRow);
};




function calculateGradeAverage(array) {
    var totalGrades = 0;
    var totalStudents = array.length;
    for (var i = 0; i < totalStudents; i++) {
        totalGrades += parseInt(array[i].grade)
    }
    var averageGrade = parseInt(totalGrades / totalStudents);
    if (isNaN(averageGrade)) {
        averageGrade = 0;
    }
    return averageGrade;
}



function handleSavedUpdate(){
    var editedName = $('#editName').val();
    var editedCourse = $('#editCourse').val();
    var editedGrade = $('#editGrade').val();
    var buttonID = $('#idHolder').text();
    var the_data = {
        editedName,
        editedCourse,
        editedGrade,
        buttonID,
        action: 'update'
    }
    var ajaxOptions = {
        dataType: 'json',
        data: the_data,
        method: 'GET',
        url: 'data.php',
        success: function (response) {
            $('#editName').val('');
            $('#editCourse').val('');
            $('#editGrade').val('');
            $('tbody').empty();
            getDataFromServer();
            // updateStudentList();
        },
        error: function () {
            $('#errorModal').modal('show');
        }
    }
    $.ajax(ajaxOptions);
    $('#editModal').modal('hide');


}



function handleDeleteButton(studentObj) {
    console.log('delete button clicked');
    // this.closest('tr').remove();
    // var removeStudent = $(this).attr('id');
    studentArray.splice(studentObj, 1);
    var avgGrade = calculateGradeAverage(studentArray);
    $('.avgGrade').text(avgGrade + "%")
    // deleteStudent(studentObj)

}

function getDataFromServer() {
    var the_data = {
        action:'readAll'
        // api_key: "OH4GI7VfKh"
    }
    var ajaxOptions = {
        dataType: "json",
        data: the_data,
        method: "GET",
        url: 'data.php',
        // url: "https://s-apis.learningfuze.com/sgt/get",

        success: function (response) {
            var responseArray = response.data;
            console.log(studentArray);
            for (var i = 0; i < responseArray.length; i++) {
                studentArray = responseArray;
                renderStudentOnDom(responseArray[i]);
                var avgGrade = calculateGradeAverage(responseArray);
                $(".avgGrade").text(avgGrade + "%")
            }
        },
        error: failedToRetrieve
    }
    $.ajax(ajaxOptions)
}

function sendToServer(studentObj) {
    var the_data = {
        action: 'insert',
        // api_key: "OH4GI7VfKh",
        name: studentObj.name,
        course_name: studentObj.course_name,
        grade: studentObj.grade,
        // student_id: parseInt(studentObj.id)
    }
    var ajaxOptions = {
        async: false,
        dataType: "json",
        data: the_data,
        method: "GET",
        url: 'data.php',

        // url: "https://s-apis.learningfuze.com/sgt/create",

        success: function (response) {
            console.log("Success: Student Add to Serve");
            studentObj.id = response.inserID;
        },
        error: failedToRetrieve

    }
    $.ajax(ajaxOptions);
}

function deleteStudent(studentObj) {
    var the_data = {
        // api_key: "OH4GI7VfKh",
        action: 'delete',

        student_id: parseInt(studentObj.id)

    }
    var ajaxOptions = {
        dataType: "json",
        data: the_data,
        method: "GET",
        // url: "https://s-apis.learningfuze.com/sgt/delete",
        url: 'data.php',


        success: function () {
            console.log("Success: Student Added to Serve")
        },
        error: failedToRetrieve

    }
    $.ajax(ajaxOptions);
}


function failedToRetrieve() {
    $('.errorModal').modal('show');
}

function loadSpinner() {
    $(document).ajaxStart(function () {
        $('.fa-spin').show();
    })
    $(document).ajaxComplete(function () {
        $('.fa-spin').hide();
    })
}

function searchSubmit(){
    var input = $('#mySearch').val();
    var search = $('select').val();
    var type;
    switch(search) {
        case "0":
        type = "name"
        break;
        case "1": 
        type = "course"
        break;
        case "2":
        type = "grade"
        break; 
    }
    console.log(input);
    console.log(type);
    event.preventDefault();
    var the_data = {
        // api_key: "OH4GI7VfKh",
        action: type,

        filter: input
    }
    var ajaxOptions = {
        dataType: 'json',
        data: the_data,
        method: 'GET',
        url: 'data.php',

        success: function (response) {
            console.log(response);
            if (response.data) {
            var responseArray = response.data;
            $('tbody').empty();
            for (var i = 0; i < responseArray.length; i++) {
                studentArray = responseArray;
                renderStudentOnDom(responseArray[i]);
                var avgGrade = calculateGradeAverage(responseArray);
                $(".avgGrade").text(avgGrade + "%")
            }
        }
        else{
            $('#searchModal').modal('show');
        }
        },
        error:  function(error) {
            $('#searchModal').modal('show')
        }

    }

    $.ajax(ajaxOptions);



        // Declare variables
        // var input, filter, ul, li, a, i;
        // input = document.getElementById("mySearch");
        // filter = input.value.toUpperCase();
        // ul = document.getElementById("myMenu");
        // li = ul.getElementsByTagName("li");
    
        // // Loop through all list items, and hide those who don't match the search query
        // for (i = 0; i < li.length; i++) {
        //     a = li[i].getElementsByTagName("a")[0];
        //     if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        //         li[i].style.display = "";
        //     } else {
        //         li[i].style.display = "none";
        //     }
        // }
    }

