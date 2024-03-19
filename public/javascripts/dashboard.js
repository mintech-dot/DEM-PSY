$(document).ready(function() {
    $('#example').DataTable({
        // Add any customization options here
    
        dom: 'Bfrtip',
         buttons: [
    
    {
        extend: 'excelHtml5',
        exportOptions: {
            columns: [ 1, 2,3,4] ,
    
        } ,
        className: 'buttons-excel' ,
        className: 'buttons-pdf'
    },
    {
        extend: 'pdfHtml5',
        exportOptions: {
            columns: [ 1, 2,3,4 ]
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
    
    
    });
    
   