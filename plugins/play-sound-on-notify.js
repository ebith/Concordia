const audio = new Audio();
audio.autoplay = true;

const countObserver = new MutationObserver(mutations => {
  const number = mutations[0].target.textContent - 1;
  audio.src = Concordia.sounds[number] ? Concordia.sounds[number] : Concordia.sounds[Concordia.sounds.length - 1];
});

const firstObserver = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.classList.contains('iconSpacing-5GIHkT') && node.firstChild.classList.contains('wrapper-2xO9RX')) {
        audio.src = Concordia.sounds[0];
        countObserver.disconnect();
        countObserver.observe(node, {characterData: true, subtree: true});
      }
    }
  }
});

firstObserver.observe(document.querySelector('.channels-3g2vYe'), {childList: true, subtree: true});
