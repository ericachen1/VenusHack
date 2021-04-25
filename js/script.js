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

    $('.radio-group .js-radio').click(function(){
        $(this).parent().find('.js-radio').children('.radio-button-square').removeClass('border-1px-blue');
        $(this).children('.radio-button-square').addClass('border-1px-blue');
        var val = $(this).attr('data-value');
        console.log(val);
    });
});

function convertTimeToMilliseconds(time) {
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1];

    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}