var selectedActivity = null;

$(document).ready(function () {
    // Start a dummy timer on page load
    $('.flipTimer').flipTimer({
        direction: 'down',
        intervalTime: 0
    });
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== 'granted')
        Notification.requestPermission();

    $('#time').focusout(() => {
        startTimer();
    });

    $('.refresh').click(function () {
        startTimer();
    })

    $('.radio-group .js-radio').click(function () {
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
    var bodyText = 'Hey there! You\'ve been notified!';
    switch(selectedActivity) {
        case 'Physical Wellness':
            bodyText = 'Your reminder to stand up and stretch';
        break;
        case 'Intellectual Wellness':
            bodyText = '';
        break;
        case 'Spiritual Wellness':
            bodyText = '';
        break;
        case 'Emotional Wellness':
            bodyText = '';
        break;
        case 'Occupational Wellness':
            bodyText = '';
        break;
        case 'Social Wellness':
            bodyText = 'Your reminder to contact loved ones!';
        break;
        case 'Environmental':
            bodyText = 'Your reminder to talk a walk outside';
        break;
    }
    $('#timer-alert--activity').text(selectedActivity);
    $('#timer-alert--body').text(bodyText);
    $('#timer-alert').modal();
}

function startTimer() {
    console.log(document.getElementById('time').value);
    var timeInMilliseconds = convertTimeToMilliseconds(document.getElementById('time').value);
    // Start timer only if timeInMilliseconds is not empty
    if (timeInMilliseconds) {
        // Check if an activity was selected
        if (selectedActivity) {
            // Reset the filpTimer by resetting the html
            $('.timer-div').html('');
            $('.timer-div').append(`
                <div class="flipTimer">
                    <div class="hours"></div>
                    <div class="minutes"></div>
                    <div class="seconds"></div>
                </div>
            `);
            $('.flipTimer').flipTimer({
                direction: 'down',
                intervalTime: timeInMilliseconds,
                callback: function () {
                    displayModal();
                    sendNotification();
                }
            });
        } else {
            alert('Please selected an activity');
        }
    } else {
        alert('Please enter both the hours and minutes');
    }
}

function sendNotification() {
    if (Notification.permission !== 'granted')
        Notification.requestPermission();
    else {
        var bodyText = 'Hey there! You\'ve been notified!';
        switch(selectedActivity) {
            case 'Physical Wellness':
                bodyText = 'Your reminder to stand up and stretch';
            break;
            case 'Intellectual Wellness':
                bodyText = '';
            break;
            case 'Spiritual Wellness':
                bodyText = '';
            break;
            case 'Emotional Wellness':
                bodyText = '';
            break;
            case 'Occupational Wellness':
                bodyText = '';
            break;
            case 'Social Wellness':
                bodyText = 'Your reminder to contact loved ones!';
            break;
            case 'Environmental':
                bodyText = 'Your reminder to talk a walk outside';
            break;
        }
        var notification = new Notification(selectedActivity, {
            // icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
            body: bodyText,
        });
        notification.onclick = function () {
            window.open(window.location.href);
        };
    }
}