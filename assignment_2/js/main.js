function validateForm(formData) {
    if (formData.name === '' || formData.age === '' || formData.city === '' || formData.email === '' || formData.phone === '') {
        return false;
    }

    if (!/^[a-zA-Z]+$/.test(formData.name)) {
        return false;
    }

    if (!/^\d+$/.test(formData.age)) {
        return false;
    }

    if (!/^[a-zA-Z]+$/.test(formData.city)) {
        return false;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
        return false;
    }

    if (!/^\d+$/.test(formData.phone)) {
        return false;
    }

    return true;
}

function writeFormData(formData) {
    $('#name-content').text(formData.name);
    $('#age-content').text(formData.age);
    $('#city-content').text(formData.city);
    $('#email-content').text(formData.email);
    $('#phone-content').text(formData.phone);
    $('#form-content').show();
    $('#form-alert').hide();
}

$(function() {
    $('#erase-btn').click(function() {
        $('#bs-form')[0].reset();
        $('#form-content').hide();
        $('#form-alert').hide();
    });

    $('#submit-btn').click(function() {
        var formData = {
            name: $('#name').val(),
            age: $('#age').val(),
            city: $('#city').val(),
            email: $('#email').val(),
            phone: $('#phone').val()
        };

        if (validateForm(formData)) {
            writeFormData(formData);
        } else {
            $('#form-alert').html('Please check the form for errors. Please check that the Name and City fields ' +
                'only contain letters, the Age and pPone number fields only contain numbers and that you filled in ' +
                'the correct email address. ').show();
        }
    });
});

$(function() {
    $('#myTab a').on('click', function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
});