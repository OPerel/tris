// import Parallax from 'parallax-js';
import './styles.scss';

// import _0 from './assets/0.png';
// import _1 from './assets/1.png';
// import _2 from './assets/2.png';
// import _3 from './assets/3.png';
// import _4 from './assets/4.png';
// import _5 from './assets/5.png';

// const tris = document.getElementsByClassName('tris')[0];
// const square = document.getElementsByClassName('square')[0];
const gallery = document.getElementsByClassName('gallery')[0];
// const navItems = document.querySelectorAll('li');
const container = document.getElementsByClassName('container')[0];
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
  // const containerHeight = container.clientHeight * 4;
  // console.log(window.scrollY, document.body.clientHeight, window.innerHeight)
  let scrollpos = `${Math.floor(window.scrollY / (document.body.clientHeight - window.innerHeight) * 350)}`;
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

// for (let i = 0; 0 < 4; i++) {
//   const tri = document.createElement('div');
//   tri.classList.add('tris', `tris_${i}`)
//   container.appendChild(tri);
// }




// const container = document.getElementsByClassName('container')[0];
// const scrollX = document.getElementsByClassName('scroll-x')[0];
// const projects = document.getElementsByClassName('projects')[0]
// const contact = document.getElementsByClassName('contact')[0]

// window.addEventListener('wheel', function(e) {
//   let scrollXScrolled = Math.ceil(scrollX.scrollWidth - scrollX.scrollLeft) === scrollX.clientWidth;
//   let containerScrolled = Math.ceil(container.scrollHeight - container.scrollTop) === container.clientHeight;
//   // const contactScrolled = contact.scrollTop === (contact.scrollHeight - contact.offsetHeight);
  
//   console.log('containerScrolled: ', containerScrolled);
//   console.log('scrollHeight: ', container.scrollHeight, 'scrollTop: ', container.scrollTop, 'clientHeight: ', container.clientHeight)
//   console.log('scrollXScrolled: ', scrollXScrolled);
//   console.log('scrollHeight: ', scrollX.scrollWidth, 'scrollTop: ', scrollX.scrollLeft, 'clientHeight: ', scrollX.clientWidth)

//   if (containerScrolled) {
//     e.preventDefault();
//     if (e.deltaY > 0) {
//       scrollX.scrollLeft += 100;
//     }
//     else {
//       scrollX.scrollLeft -= 100;
//     }
//     if (!scrollXScrolled) {
//       console.log('set containerScrolled to false')
//       containerScrolled = false;
//     }
//   }
// }, { passive: false });


    