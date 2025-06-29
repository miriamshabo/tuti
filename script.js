// הגדרות הטופס
const EVENT_NAME = "ברית מילה"; // שם האירוע

document.addEventListener('DOMContentLoaded', function() {
    // מקבל גישה לטופס אישור הגעה
    const confirmationForm = document.getElementById('confirmationForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const nextUrlField = document.getElementById('nextUrlField');
    
    // הגדרת כתובת החזרה אחרי השליחה
    if (nextUrlField) {
        nextUrlField.value = window.location.href + '?submitted=true';
    }
    
    // בדיקה אם הטופס כבר נשלח (חזרנו מדף האישור של FormSubmit)
    checkIfSubmitted();
    
    // מוסיף מאזין לאירוע שליחת הטופס - רק עבור אנימציה
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
