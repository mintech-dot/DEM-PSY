

const createButton = document.getElementById('createButton');
const createDialog = document.getElementById('createDialog');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');


// Function to show the create dialog
createButton.addEventListener('click', () => {
    createDialog.classList.remove('hidden');
});

// Function to close the create dialog
cancelButton.addEventListener('click', () => {
    createDialog.classList.add('hidden');
});






$(document).ready(function() {
$('#example').DataTable({
    // Add any customization options here

    dom: 'Bfrtip',
     buttons: [

{
    extend: 'excelHtml5',
    exportOptions: {
        columns: [ 0, 1, 2,3,4, 5 ] ,

    } ,
    className: 'buttons-excel' ,
    className: 'buttons-pdf'
},
{
    extend: 'pdfHtml5',
    exportOptions: {
        columns: [ 0, 1, 2,3,4, 5 ]
    }
},
'colvis'
] ,

    pageLength : 7,
    oLanguage: {
    "sSearch": " " ,
    "sLengthMenu": "إظهار _MENU_ مدخلات" ,
    "sInfo":      "عرض من  _START_ إلى _TOTAL_ من _END_ مدخلات" ,
    "oPaginate": {
        "sNext":     "التالي",
        "sPrevious": "السابق"
        },

    "sEmptyTable":     "لا توجد بيانات متوفرة في الجدول",
    "sInfoEmpty":      "عرض من 0 الى 0 من 0 مدخلات",
    "sLoadingRecords": "التحميل...",
    "sProcessing":     "معالجة...",
    "sZeroRecords":    "لم يتم العثور على سجلات مطابقة" ,
    "sInfoFiltered":   "(تم ترشيحه من _MAX_ مدخلات)",
    
},


});
var dataTable = $('#example').DataTable();

$('#example').on('click', '.editButton', function () {
    var data = dataTable.row($(this).parents('tr')).data();
    // Capture data from the clicked row

    // Send data as JSON in the request payload
    // Replace '/edit' with your endpoint
    $.ajax({
        url: '/edit',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            id: data[0],
            name: data[1]
        }),
        success: function(response) {
            // Handle success response
        },
        error: function(xhr, status, error) {
            // Handle error
        }
    });
});

});


