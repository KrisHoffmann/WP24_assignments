$(document).ready(function() {
    // Toggle link list visibility
    $('#toggle-links-btn').on('click', function() {
        $('#links-list').fadeToggle();
    });

    // Add new link to the list
    $('#add-link-btn').on('click', function(event) {
        event.preventDefault();
        var linkName = $('#link-name').val();
        var linkUrl = $('#link-url').val();
        if (linkName && linkUrl) {
            var newLink = $('<li><a href="' + linkUrl + '">' + linkName + '</a></li>');
            $('#links-list').append(newLink);
            $('#link-name').val('');
            $('#link-url').val('');
        } else {
            alert('Please fill in both fields!');
        }
    });

    // Activate delete mode
    var deleteMode = false;
    $('#delete-mode-btn').on('click', function() {
        deleteMode =!deleteMode;
        if (deleteMode) {
            $(document).on('click', function(event) {
                if ($(event.target).is('button')) return;
                $(event.target).remove();
            });
        } else {
            $(document).off('click');
        }
    });
});