






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
    
    
    });
    
    
    document.getElementById('adduser').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
    
        // Get form input values
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const type = document.getElementById('type').value;
    
        // Create an object with form data
        const formData = {
            name: name,
            address: address,
            phone: phone,
            type:type,
        };
    
        // Send data to Express server
        fetch('/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(response => response(window.location.reload()))
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        
            
        
    });
    
    document.getElementById('edituser').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
    
        // Get form input values
        const id = document.getElementById('eid').value;
        const name = document.getElementById('ename').value;
        const address = document.getElementById('eaddress').value;
        const phone = document.getElementById('ephone').value;
        const type = document.getElementById('etype').value;
    
        // Create an object with form data
        const formData = {
            id : id ,
            name: name,
            address: address,
            phone: phone,
            type:type,
        };
    
        // Send data to Express server
        fetch('/users/:id/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(response => response(window.location.reload()))
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        
            
        
    });