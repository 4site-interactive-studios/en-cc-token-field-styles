// An Ode to the Code Gods
//
// In the sacred halls of syntax and scheme,
// We crafted a script, a programmer’s dream.
// With debounce as our shield, against stormy flows,
// We tame the tempest that in the viewport grows.
//
// In the div's deep shadows, hidden from sight,
// Styles we set, with margins just right.
// Visibility granted by a coder’s decree,
// A container now seen, as it was meant to be.
//
// An observer lies waiting for the node's silent call,
// To update, to adapt, to stand proud and tall.
// Through mutation's gateway, a frame does appear,
// And the code to the gods, we now revere.

// Utility function for debouncing calls to a function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to set styles to a container
function setContainerStyles(container, height, margins) {
  const { top, right, bottom, left } = margins;
  container.style.height = `${height}px`;
  container.style.marginTop = top;
  container.style.marginRight = right;
  container.style.marginBottom = bottom;
  container.style.marginLeft = left;
  container.style.visibility = 'visible'; // Make the container visible
}

// Function to update input field, container styles, and revert input field type
function updateInputFieldAndContainer(inputSelector, containerSelector) {
  const inputField = document.querySelector(inputSelector);
  const container = document.querySelector(containerSelector);

  if (!inputField || !container) {
    console.error(`One or more elements not found for selectors: "${inputSelector}", "${containerSelector}".`);
    return; // Exit the function if elements are not found
  }

  // Change and revert the input field to manipulate styles
  inputField.type = 'text';
  inputField.style.cssText = 'position: absolute; left: -100vw; bottom: -100vh; visibility: hidden;';
  
  const computedStyle = window.getComputedStyle(inputField);
  const height = inputField.offsetHeight;
  const margins = {
    top: computedStyle.marginTop,
    right: computedStyle.marginRight,
    bottom: computedStyle.marginBottom,
    left: computedStyle.marginLeft
  };

  setContainerStyles(container, height, margins);

  // Revert the input field
  inputField.type = 'hidden';
  inputField.style.cssText = '';
}

// Function to observe the addition of an iframe in a container
function observeElementAddition(containerSelector, inputSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found.`);
    return;
  }
  // Initially set the container visibility to hidden
  container.style.visibility = 'hidden';

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        const iframe = Array.from(mutation.addedNodes).find(node => node.tagName === 'IFRAME');
        if (iframe) {
          updateInputFieldAndContainer(inputSelector, containerSelector);
          observer.disconnect(); // Disconnect after successful update
        }
      }
    });
  });

  observer.observe(container, { childList: true, subtree: true });
}

// Debounced version of the update function for window resize
const debouncedUpdate = debounce(() => {
  updateInputFieldAndContainer("input[name='transaction.ccvv']", "#en__field_transaction_ccvv");
  updateInputFieldAndContainer("input[name='transaction.ccnumber']", "#en__field_transaction_ccnumber");
}, 20);

// Event listener for window resize
window.addEventListener('resize', debouncedUpdate);

// Observe the containers for iframe additions
observeElementAddition("#en__field_transaction_ccvv", "input[name='transaction.ccvv']");
observeElementAddition("#en__field_transaction_ccnumber", "input[name='transaction.ccnumber']");