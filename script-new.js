// הגדרות הטופס וההודעות
const YOUR_PHONE_NUMBER = "972533858881"; // מספר הטלפון שלך בפורמט בינלאומי
const EVENT_NAME = "ברית מילה"; // שם האירוע

document.addEventListener('DOMContentLoaded', function() {
    // מקבל גישה לטופס אישור הגעה
    const confirmationForm = document.getElementById('confirmationForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    // בדיקה אם הטופס כבר נשלח לפי פרמטר ב-URL
    checkIfSubmitted();
    
    // מוסיף מאזין לאירוע שליחת הטופס
    if (confirmationForm) {
        confirmationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // מניעת שליחה רגילה של הטופס
            
            // מקבל את הנתונים מהטופס
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const phone = document.getElementById('phone').value;
            const guests = document.getElementById('guests').value;
            
            // בדיקה שכל השדות מלאים
            if (!firstName || !lastName || !phone || !guests) {
                alert('אנא מלא את כל השדות הנדרשים');
                return;
            }
            
            // הכנת הודעת וואטסאפ
            const currentDateTime = new Date().toLocaleString('he-IL');
            const messageDetails = `*אישור הגעה חדש - ${EVENT_NAME}*

זמן האישור: ${currentDateTime}

*פרטי האורח:*
שם מלא: ${firstName} ${lastName}
טלפון: ${phone}
מספר אורחים: ${guests}
`;
            
            // הכנת קישור וואטסאפ
            const encodedMessage = encodeURIComponent(messageDetails);
            const whatsappURL = `https://api.whatsapp.com/send?phone=${YOUR_PHONE_NUMBER}&text=${encodedMessage}`;
            
            // שמירת מצב URL נוכחי לחזרה לאחר שליחת הוואטסאפ
            const currentUrl = window.location.href;
            const returnUrl = currentUrl + (currentUrl.indexOf('?') > -1 ? '&' : '?') + 'submitted=true';
            
            // פתיחת וואטסאפ והגדרת חזרה לדף עם פרמטר submitted
            window.location.href = whatsappURL;
            
            // הגדרת טיימר שיחזיר את המשתמש לדף האתר עם סימון שהטופס נשלח
            // הערה: זה מוגבל על ידי דפדפנים מסוימים
            setTimeout(() => {
                window.location.href = returnUrl;
            }, 3000);
        });
    }
});

// בדיקה אם הטופס כבר נשלח
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
