var selectedActivity = null;

$(document).ready(function () {

    $('#time').focusout(() => {
        console.log(document.getElementById('time').value);
        var timeInMilliseconds = convertTimeToMilliseconds(document.getElementById('time').value);
        // Start timer only if timeInMilliseconds is not empty
        if (timeInMilliseconds) {
            // Check if an activity was selected
            if(selectedActivity) {
                $('.flipTimer').flipTimer({
                    direction: 'down',
                    intervalTime: timeInMilliseconds
                });
            } else {
                alert('Please selected an activity');
            }
        }
    });

    $('.radio-group .js-radio').click(function(){
        $(this).parent().find('.js-radio').children('.radio-button-square').removeClass('radio-selected');
        $(this).children('.radio-button-square').addClass('radio-selected');
        var val = $(this).attr('data-value');
        console.log(val);
        selectedActivity = val;
    });
});

function convertTimeToMilliseconds(time) {
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1];

    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}

function displayModal() {
    console.log(selectedActivity);
    $('#timer-alert--activity').text(selectedActivity);
    $('#timer-alert').modal();
}