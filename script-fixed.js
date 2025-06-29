// הגדרות הטופס
const EVENT_NAME = "ברית מילה"; // שם האירוע

document.addEventListener('DOMContentLoaded', function() {
    // מקבל גישה לטופס אישור הגעה
    const confirmationForm = document.getElementById('confirmationForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const formRedirectUrl = document.getElementById('formRedirectUrl');
    
    // הגדרת כתובת החזרה אחרי שליחת הטופס
    if (formRedirectUrl) {
        formRedirectUrl.value = window.location.href + (window.location.href.indexOf('?') > -1 ? '&' : '?') + 'submitted=true';
    }
    
    // בדיקה אם הטופס כבר נשלח לפי פרמטר ב-URL
    checkIfSubmitted();
    
    // מציג אנימציה כשהטופס נשלח
    if (confirmationForm) {
        confirmationForm.addEventListener('submit', function() {
            const submitButton = confirmationForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = 'שולח...';
                submitButton.disabled = true;
            }
        });
    }
});

// בדיקה אם הטופס כבר נשלח (חזרנו מדף האישור של FormSubmit)
function checkIfSubmitted() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('submitted')) {
        const confirmationForm = document.getElementById('confirmationForm');
        const confirmationMessage = document.getElementById('confirmationMessage');
        
        if (confirmationForm && confirmationMessage) {
            confirmationForm.classList.add('hidden');
            confirmationMessage.classList.remove('hidden');
        }
    }
}
