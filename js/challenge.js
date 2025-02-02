let intervalID;
let likes = new Map();

const hiddenInput = document.createElement('input');

document.addEventListener('DOMContentLoaded', () => {
  intervalID = setInterval(() => {
    document.getElementById('counter').innerHTML = parseInt(document.getElementById('counter').innerHTML) + 1;
  }, 1000);
})

document.getElementById('plus').addEventListener('click', () => {
  document.getElementById('counter').innerHTML = parseInt(document.getElementById('counter').innerHTML) + 1;
})

document.getElementById('minus').addEventListener('click', () => {
  document.getElementById('counter').innerHTML = parseInt(document.getElementById('counter').innerHTML) - 1;
})

document.getElementById('heart').addEventListener('click', () => {
  const counterVal = document.getElementById('counter').innerHTML; 
  likes.set(counterVal, likes.get(counterVal) ? likes.get(counterVal) + 1 : 1);
  document.getElementById('likes').firstChild && document.getElementById('likes').firstChild.remove();
  const like = document.createElement('li');
  like.innerHTML = `Number: ${counterVal}, Likes: ${likes.get(counterVal)}`
  document.getElementById('likes').appendChild(like);
});

document.getElementById('pause').addEventListener('click', () => {
  const buttonText = document.getElementById('pause').innerText;
  if (buttonText === 'pause') {
    clearInterval(intervalID);
    Array.from(document.getElementsByTagName('button')).forEach(button => {
      button.innerText !== 'pause' ? button.disabled = true : button.innerText = 'resume';
    });      
  }
  if (buttonText === 'resume') {
    intervalID = setInterval(() => {
      document.getElementById('counter').innerHTML = parseInt(document.getElementById('counter').innerHTML) + 1;
    }, 1000);
    Array.from(document.getElementsByTagName('button')).forEach(button => {
      button.innerText !== 'resume' ? button.disabled = false : button.innerText = 'pause';
    });
  }
});

document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault();
  const comment = document.createElement('p');
  comment.innerText = document.getElementById('comment-input').value;
  document.getElementById('list').appendChild(comment);
  document.getElementById('comment-input').value = '';
});

// Select the node that will be observed for mutations
const targetNode = document.getElementById('counter');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const counterVal = document.getElementById('counter').innerHTML; 
      document.getElementById('likes').firstChild && document.getElementById('likes').firstChild.remove();
      const like = document.createElement('li');
      like.innerHTML = `Number: ${counterVal}, Likes: ${likes.get(counterVal)}`
      document.getElementById('likes').appendChild(like);
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
// observer.disconnect();