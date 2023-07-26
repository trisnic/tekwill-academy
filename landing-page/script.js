const toggleMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.nav-links');
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}


const openModalButton = document.getElementById('open-modal');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');
const contactForm = document.querySelector('.contactus-form');
const submitButton = contactForm.querySelector('button[type="submit"]');
const thankYouMessage = document.createElement('div');
thankYouMessage.textContent = 'Thank you for contacting us!';
thankYouMessage.classList.add('thank-you-message');

let isModalOpen = false;

// Store the initial content of the modal
const initialModalContent = modal.innerHTML;

openModalButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!isModalOpen) {
    modal.style.display = 'block';
    isModalOpen = true;
  } else {
    closeModal();
  }
});

closeModalButton.addEventListener('click', () => {
  closeModal();
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

function closeModal() {
  // Restore the initial content of the modal before closing it
  modal.innerHTML = initialModalContent;
  modal.style.display = 'none';
  isModalOpen = false;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();


  // Replace the form with the thank you message
  contactForm.style.display = 'none';
  submitButton.disabled = true; 
  thankYouMessage.appendChild(closeModalButton); 
  modal.innerHTML = '';
  modal.appendChild(thankYouMessage);
});




const changeBackgroundColor = () => {
    const colors = ['red', 'black', 'green', 'yellow', 'orange'];
    let index = 0;

    return () => {
        document.body.style.background = `linear-gradient(to bottom, ${colors[index]} 0%, ${colors[index]} 50%, red 50%, red 100%)`;
        index = (index + 1)% colors.length;
    }
}


const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");

function handleSearchIconClick() {
  searchInput.classList.toggle("active");
  searchInput.focus();
}
searchIcon.addEventListener("click", handleSearchIconClick);

//sticky menu dark bg on scroll
window.addEventListener('scroll', function() {
    var mainHeader = document.getElementById('main-header');
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 50) {
      mainHeader.classList.add('menu-black-bg');
    } else {
      mainHeader.classList.remove('menu-black-bg');
    }
  });

  //Subscribe in the footer
  document.getElementById("subscribeForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const emailInput = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(emailInput)) {
      alert("Thank you for subscribing!");
      document.getElementById("email").value = ""; // Clear the email input
    } else {
      alert("Please enter a valid email address.");
    }
  });
//end subscribe in the footer

//Thank you for booking an appointment message when form is successfully submitted

document.getElementById("appointmentForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  // Validate form inputs
  let fullNameInput = document.querySelector(".fullName");
  let emailInput = document.querySelector(".email");
  let selectInputs = document.querySelectorAll("select");
  let messageInput = document.getElementById("message");

  let isValid = true;
  if (!fullNameInput.value.trim()) {
    isValid = false;
    fullNameInput.classList.add("error");
  } else {
    fullNameInput.classList.remove("error");
  }

  if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
    isValid = false;
    emailInput.classList.add("error");
  } else {
    emailInput.classList.remove("error");
  }

  for (let selectInput of selectInputs) {
    if (!selectInput.value) {
      isValid = false;
      selectInput.classList.add("error");
    } else {
      selectInput.classList.remove("error");
    }
  }

  if (!messageInput.value.trim()) {
    isValid = false;
    messageInput.classList.add("error");
  } else {
    messageInput.classList.remove("error");
  }

  if (isValid) {
    document.getElementById("thankYouMessage").style.display = "block";
    document.getElementById("appointmentForm").reset();
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//using DOM to hide an element on mobile
const element = document.getElementById('separator');
element.classList.add('mob-hidden');

