$(document).ready(function () {
    $('#time').focusout(() => {
        console.log(document.getElementById('time').value);
        var timeInMilliseconds = convertTimeToMilliseconds(document.getElementById('time').value);
        // Start timer only if timeInMilliseconds is not empty
        if (timeInMilliseconds) {
            $('.flipTimer').flipTimer({
                direction: 'down',
                intervalTime: timeInMilliseconds
            });
        }
    });
});

function convertTimeToMilliseconds(time) {
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1];

    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}