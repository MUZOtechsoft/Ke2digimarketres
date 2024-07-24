document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var closeButton = document.getElementById('close');
    var form = document.getElementById('popupForm');
    var message = document.getElementById('message');

    popup.style.display = 'block';

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', form.action);

        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.result === 'success') {
                    form.reset();
                    form.style.display = 'none';
                    message.style.display = 'block';
                } else {
                    alert('There was an error submitting the form: ' + response.error);
                }
            } else {
                alert('An error occurred while submitting the form.');
            }
        };

        xhr.onerror = function() {
            alert('An error occurred while submitting the form.');
        };

        var urlEncodedData = new URLSearchParams(formData).toString();
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(urlEncodedData);
    });
});
