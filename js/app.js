/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const NAVLIST = document.getElementById('navbar__list');
const SECTIONS = [...document.getElementsByTagName('section')];

/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const buildList = (section) => {
  const ID = section.getAttribute('id');
  const TEXT = section.getAttribute('data-nav');
  const LIST = `<li class="navbar__list-item"><a href="#${ID}" class="menu__link">${TEXT}</a></li>`;
  return LIST;
}

// Add class 'active' to section when near top of viewport
const handleSectionScrollObserve = (entries) => {
  const section = entries[0].target;

  // remove active class from all sections
  [...document.getElementsByTagName('section')].forEach(sec =>sec.classList.remove('your-active-class'));

	// isIntersecting is true when element and viewport are overlapping
	// isIntersecting is false when element and viewport don't overlap
	if(section && entries[0].isIntersecting === true) {
    section.classList.add('your-active-class');

    const menuLinks = document.querySelectorAll('.menu__link');
    menuLinks.forEach((link)=>{
      link.classList.remove('active');
      const ID = section.getAttribute('id')
      if(link.getAttribute('href') === `#${ID}`) {
        link.classList.add('active');
      }
    })
  }
}

// Scroll to anchor ID using scrollTO event
const handleGoTo = (e) => {
  e.preventDefault();
  const { target } = e;
  const isLink = target.nodeName === 'A';
  // Guard to amke sure the clicked element is the link
  if (!isLink) return false;
  const GOTO_SECTION = document.querySelector(target.hash);
  // get section from top
  const top  = GOTO_SECTION.offsetTop;

  return window.scrollTo({
  top,
  behavior: 'smooth'
 })
}
/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
const NAV = (SECTIONS.map(buildList)).join('');
NAVLIST.insertAdjacentHTML('afterbegin', NAV);

// Scroll to section on link click
NAVLIST.addEventListener('click', handleGoTo);

// Set sections as active
const observer = new IntersectionObserver(handleSectionScrollObserve, { threshold: [0.6] });
[...document.getElementsByTagName('section')].forEach((section)=>observer.observe(section));

