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


/************ set global scrollpos **************/

let lastScrollY = 0, ticking = false;

const onScroll = () => {
  // console.log('onScroll is running');
  const body = document.getElementsByTagName('body')[0];
  lastScrollY = window.scrollY;
  requestTick();
}

const requestTick = () => {
  // console.log('requestTick is running');
  if(!ticking) {
    requestAnimationFrame(animate);
  }
  ticking = true;
}

const animate = () => {
  // console.log('animate is running');

  // reset the tick so we can capture the next onScroll
  ticking = false;

  let scrollpos;

  // const main = document.getElementsByTagName('main')[0];
  scrollpos = (lastScrollY / (document.body.clientHeight - window.innerHeight)) * 200;
  setScrollPos(scrollpos);
}

const setScrollPos = (scrollPos) => {
  // console.log('setScrollPos: ', scrollPos)
  document.documentElement.setAttribute('style', `--scrollpos: ${scrollPos}`);
}

/************ end setting global scrollpos *************/

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', onScroll, { passive: false });

// document.addEventListener('wheel', (e) => {
//   console.log('mousewheel')
//   e.preventDefault();
// }, {passive: false});

const clickMenuItems = (item) => {
  // console.log('Go to: ', item.innerText);
  const mySection = document.getElementById(`${item.innerText}`);
  scrollIntoView(mySection, document.body, { easing: 'ease-out', duration: 1200 });
  // mySection.scrollIntoView({block: 'start', behavior: 'smooth'});
}

const menuListItems = document.querySelectorAll('li');
menuListItems.forEach(item => {
  item.addEventListener('click', () => clickMenuItems(item));
})



    