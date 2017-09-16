$(document).foundation();


const imageGrid = document.querySelector('.image-grid'),
    footer = document.querySelector('footer');

imageGrid.addEventListener('click', (e)=>{
  e.preventDefault();
  let modalID = e.target.parentElement.getAttribute('data-reveal-id'),
        alt = e.target.getAttribute('alt'),
        src = e.target.getAttribute('src'),
        source = src.replace('.jpg', '-large.jpg'),
        avatar = e.target.parentElement.nextElementSibling.firstElementChild.getAttribute('class').replace('avatar icon-', '') + '.jpg';


  let modalHTML = `
  <div id="${modalID}" class="reveal-modal" data-reveal aria-hidden="true" role="dialog">
    <h2 class="modalTitle">Photo</h2>
    <img src="${source}" alt="${alt}">
      <div class="info">
        <img src="img/avatars/${avatar}" alt="Photo"  class="avatar">
          <span class="attribution">Photo by <b>Werner Bechtelar</b></span>
        </div>
        <a class="close-reveal-modal" aria-label="Close">&#215;</a>
      </div>`;

      footer.insertAdjacentHTML('afterend', modalHTML);

      $('#'+ modalID).foundation('reveal', 'open');
  });
