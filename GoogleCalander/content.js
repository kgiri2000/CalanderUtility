// Add custom styles dynamically
const style = document.createElement('style');
style.textContent = `
  .custom-calendar-text {
    font-size: 12px;
    color: white;
    background-color: rgb(8, 87, 214);
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
    margin-top: 25px;
  }

  .custom-calendar-text.secondary {
    font-size: 12px;
    color: white;
    background-color: rgb(244, 16, 0);
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
    margin-top: 0px;
  }
`;
document.head.appendChild(style);


function addCustomTextToSpecificDiv() {
  // Target the specific div with data-datekey="28061"
  // Might be different for different user
  // As the website is very dynamic, this might not work for all case
  const targetDiv = document.querySelector('.MGaLHf.ChfiMc[data-datekey="28061"]');

  if (targetDiv) {
    // Check and add the first custom text if not already added
    if (!targetDiv.querySelector('.custom-calendar-text.primary')) {
      const primaryText = document.createElement('span');
      primaryText.classList.add('custom-calendar-text', 'primary');
      primaryText.textContent = 'Temperature: 0F';
      targetDiv.appendChild(primaryText);
    }

    // Check and add the second custom text if not already added
    if (!targetDiv.querySelector('.custom-calendar-text.secondary')) {
      const secondaryText = document.createElement('span');
      secondaryText.classList.add('custom-calendar-text', 'secondary');
      secondaryText.textContent = 'Traffic: Busy';
      targetDiv.appendChild(secondaryText);
    }
  }
}

// Observe the page for changes to dynamically loaded elements
const observer = new MutationObserver(() => {
  addCustomTextToSpecificDiv(); // Call the function whenever the DOM changes
});

// Start observing the body for changes in child nodes
observer.observe(document.body, { childList: true, subtree: true });

// Initial check when the script loads
addCustomTextToSpecificDiv();
