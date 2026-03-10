const track = document.querySelector('.marquee-track');
const container = document.querySelector('.marquee-row');

let speed = 1; // pixels per frame
let direction = -1; // -1: moving left, 1: moving right

function animateMarquee() {
  const trackWidth = track.scrollWidth;
  const containerWidth = container.clientWidth;

  let left = parseFloat(getComputedStyle(track).left) || 0;
  
  // calculate boundaries
  const maxLeft = 0;
  const minLeft = containerWidth - trackWidth;

  // reverse direction if reached edges
  if (left <= minLeft) direction = 1;
  if (left >= maxLeft) direction = -1;

  // move track
  track.style.left = (left + speed * direction) + 'px';

  requestAnimationFrame(animateMarquee);
}

animateMarquee();