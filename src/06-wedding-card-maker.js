/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing eleventement inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Your code here
  if(!containerElement) return null;

  containerElement.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-btn");
    if (removeBtn) {
      const guestItem = removeBtn.closest(".guest-item");
      if (guestItem) {
        guestItem.remove();
      }
    }
  });

  return {
    addGuest(name, side) {
      const guestItem = document.createElement("div");
      guestItem.className = "guest-item";
      guestItem.dataset.name = name;
      guestItem.dataset.side = side;

      const nameSpan = document.createElement("span");
      nameSpan.textContent = name;
      guestItem.appendChild(nameSpan);

      const removeButton = document.createElement("button");
      removeButton.className = "remove-btn";
      removeButton.textContent = "Remove";
      guestItem.appendChild(removeButton);

      containerElement.appendChild(guestItem);
      return guestItem;
    },
    removeGuest(name) {
      const guestItem = containerElement.querySelector(`.guest-item[data-name="${name}"]`);
      if (guestItem) {
        guestItem.remove();
        return true;
      }
      return false;
    },
    getGuests() {
      const guests = [];
      const guestItems = containerElement.querySelectorAll(".guest-item");
      guestItems.forEach((item) => {
        guests.push({
          name: item.dataset.name,
          side: item.dataset.side,
        });
      });
      return guests;
    },
  };
}

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here
  if(!containerElement || !previewElement) return null;

  const btn1 = document.createElement('button');
  btn1.classList.add('theme-btn');
  btn1.textContent = 'traditional';
  btn1.dataset.theme = 'traditional';

  const btn2 = document.createElement('button');
  btn2.classList.add('theme-btn');
  btn2.textContent = 'modern';
  btn2.dataset.theme = 'modern';

  const btn3 = document.createElement('button');
  btn3.classList.add('theme-btn')
  btn3.textContent = 'royal';
  btn3.dataset.theme = 'royal';

  containerElement.appendChild(btn1);
  containerElement.appendChild(btn2);
  containerElement.appendChild(btn3);

  containerElement.addEventListener('click', (event) => {
    const themeBtn = event.target.closest('.theme-btn');
    if(themeBtn) {
      previewElement.className = themeBtn.dataset.theme;
      previewElement.dataset.theme = themeBtn.dataset.theme;
    }
  })

  return {
    getTheme() {
      return previewElement.dataset.theme || null;
    }
  }
}

export function setupCardEditor(cardElement) {
  if (!cardElement) return null;

  const clearEditing = () => {
    const current = cardElement.querySelector(".editing");
    if (current) {
      current.classList.remove("editing");
      current.contentEditable = "false";
    }
  };

  cardElement.addEventListener("click", (event) => {
    const editable = event.target.closest("[data-editable]");

    if (editable && cardElement.contains(editable)) {
      clearEditing();

      editable.contentEditable = "true";
      editable.classList.add("editing");
    } else {
      clearEditing();
    }
  });

  return {
    getContent(field) {
      const el = cardElement.querySelector(`[data-editable="${field}"]`);
      return el ? el.textContent : null;
    },
  };
}