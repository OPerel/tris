import './styles.scss';

import './assets/bg.jpg'

import { scrollIntoView } from 'scroll-js';

// const tris = document.getElementsByClassName('tris')[0];
// const square = document.getElementsByClassName('square')[0];
const gallery = document.getElementsByClassName('gallery')[0];
// const navItems = document.querySelectorAll('li');
// const container = document.getElementsByClassName('container')[0];
// const about = document.getElementById('about');
// const projects = document.getElementById('projects');
// const contact = document.getElementById('contact');

// The debounce function receives our function as a parameter
const debounce = (fn) => {
  console.log('debounce is running')
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {

      // Call our function and pass any params we received
      fn(...params);
    });

  } 
};


// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  let scrollpos = `${(window.scrollY / (document.body.clientHeight - window.innerHeight) * 200)}`;
  document.documentElement.setAttribute('style', `--scrollpos: ${scrollpos}`);
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();

gallery.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY > 0) {
    gallery.scrollLeft += 100;
  }
  else {
    gallery.scrollLeft -= 100;
  }
})

const clickMenuItems = (item) => {
  console.log('Go to: ', item.innerText);
  const mySection = document.getElementById(`${item.innerText}`);
  scrollIntoView(mySection, document.body, { easing: 'linear', duration: 1200 })
  // mySection.scrollIntoView({block: 'start', behavior: 'smooth'});
}

const menuListItems = document.querySelectorAll('li');
menuListItems.forEach(item => {
  item.addEventListener('click', () => clickMenuItems(item));
})



    