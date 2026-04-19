/**
 * 🙏 Aarti Form - Form Handling, preventDefault & Validation
 *
 * Mandir ki aarti booking form bana rahe hain! Bhakton ka naam, aarti type,
 * aur date validate karke submit karna hai. Form submit hone pe page reload
 * nahi hona chahiye (preventDefault), pehle sab fields validate karo,
 * phir success ya error callback call karo. Jaise mandir mein pujari
 * entry check karta hai ki sab theek hai, waise hi form ko validate karo.
 *
 * Functions:
 *
 *   1. validateName(name)
 *      - Name must be a string, 2-50 characters long
 *      - Only letters (a-z, A-Z) and spaces allowed
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages (Hinglish):
 *        - Not string: "Naam string hona chahiye"
 *        - Too short: "Naam mein kam se kam 2 characters hone chahiye"
 *        - Too long: "Naam 50 characters se zyada nahi ho sakta"
 *        - Invalid chars: "Naam mein sirf letters aur spaces allowed hain"
 *
 *   2. validateDate(dateString)
 *      - Must be a valid date string in YYYY-MM-DD format
 *      - Must be today or a future date (past dates not allowed)
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Date string honi chahiye"
 *        - Invalid format: "Date YYYY-MM-DD format mein honi chahiye"
 *        - Past date: "Date aaj ya future ki honi chahiye"
 *
 *   3. validateAartiType(type)
 *      - Must be one of: "morning", "evening", "special"
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Aarti type string hona chahiye"
 *        - Invalid type: "Aarti type morning, evening, ya special mein se hona chahiye"
 *
 *   4. setupAartiForm(formElement, onSuccess, onError)
 *      - Adds "submit" event listener on formElement with preventDefault()
 *      - On submit: reads form fields:
 *        - name: from input/element with name="name" (formElement.elements.name.value)
 *        - date: from input with name="date"
 *        - aartiType: from select/input with name="aartiType"
 *      - Validates all three fields using above functions
 *      - If ALL valid: calls onSuccess({ name, date, aartiType })
 *      - If ANY invalid: calls onError(errorsArray) where errorsArray contains
 *        error strings from each failed validation
 *      - Returns cleanup function that removes the submit listener
 *      - Agar formElement null/undefined, return null
 *      - Agar onSuccess or onError not functions, return null
 *
 *   5. createBookingSummary(booking)
 *      - Takes { name, date, aartiType } object
 *      - Creates a div.booking-summary containing:
 *        - h3 with text "Booking Confirmation"
 *        - p.booking-name with text "Bhakt: {name}"
 *        - p.booking-date with text "Date: {date}"
 *        - p.booking-type with text "Aarti: {aartiType}"
 *      - Returns the div element
 *      - Agar booking null/undefined or missing fields, return null
 *
 * Hint: event.preventDefault() form ka default submit behavior rokta hai.
 *   formElement.elements se form ke inputs access karo by name attribute.
 *
 * @example
 *   validateName("Rahul Sharma");
 *   // => { valid: true, error: null }
 *
 *   validateName("R");
 *   // => { valid: false, error: "Naam mein kam se kam 2 characters hone chahiye" }
 *
 *   validateDate("2025-12-25");
 *   // => { valid: true, error: null } (if date is in future)
 *
 *   validateAartiType("morning");
 *   // => { valid: true, error: null }
 *
 *   const summary = createBookingSummary({
 *     name: "Rahul", date: "2025-12-25", aartiType: "morning"
 *   });
 *   // => <div class="booking-summary">...</div>
 */
export function validateName(name) {
  // Your code here

  const errors = {
    notString: "Naam string hona chahiye",
    tooShort: "Naam mein kam se kam 2 characters hone chahiye",
    tooLong: "Naam 50 characters se zyada nahi ho sakta",
    invalidChars: "Naam mein sirf letters aur spaces allowed hain",
  }
  if(typeof name !== 'string') return { valid: false, error: errors.notString }
  if(name.length < 2) return { valid: false, error: errors.tooShort }
  if(name.length > 50) return { valid: false, error: errors.tooLong }
  if(!/^[a-zA-Z\s]+$/.test(name)) return { valid: false, error: errors.invalidChars }
  return { valid: true, error: null }
}

export function validateDate(dateString) {
  // Your code here
  const errors = {
    notString: "Date string honi chahiye",
    invalidFormat: "Date YYYY-MM-DD format mein honi chahiye",
    pastDate: "Date aaj ya future ki honi chahiye",
  }
  if(typeof dateString !== 'string') return { valid: false, error: errors.notString }
  if(!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return { valid: false, error: errors.invalidFormat }
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0,0,0,0)
  if(date < today) return { valid: false, error: errors.pastDate }
  return { valid: true, error: null }
}

export function validateAartiType(type) {
  // Your code here
  const aartiType = ["morning", "evening", "special"];
  const errors = {
    notString: "Aarti type string hona chahiye",
    invalidType: "Aarti type morning, evening, ya special mein se hona chahiye",
  }
  if(typeof type !== 'string') return { valid: false, error: errors.notString }
  if(!aartiType.includes(type)) return { valid: false, error: errors.invalidType }

  return { valid: true, error: null } 

}

export function setupAartiForm(formElement, onSuccess, onError) {
  // Your code here
  if(!formElement || typeof onSuccess !== 'function' || typeof onError !== 'function') return null

  const handler = (e) => {
    e.preventDefault();
    const name = formElement.elements.name.value;
    const date = formElement.elements.date.value;
    const aartiType = formElement.elements.aartiType.value;

    const nameV = validateName(name);
    const dateV = validateDate(date);
    const aartiV = validateAartiType(aartiType);

    const errorArray = [nameV.error, dateV.error, aartiV.error];

    if(nameV.valid && dateV.valid && aartiV.valid) {
      onSuccess({ name, date, aartiType })
    } else {
      onError(errorArray);
    }
  }
  formElement.addEventListener('submit', handler);

  cleanUp = () => {
    formElement.removeEventListener('submit', handler);
  }
  return cleanUp;
}

export function createBookingSummary(booking) {
  // Your code here
  if(!booking || !booking.name || !booking.date || !booking.aartiType) return null;

  const div = document.createElement('div');
  div.classList.add('booking-summary')
  div.innerHTML = `<h3>Booking Confirmation</h3>
<p class="booking-name">Bhakt: ${booking.name}</p>
<p class="booking-date">Date: ${booking.date}</p>
<p class="booking-type">Aarti: ${booking.aartiType}</p>`
return div
}
