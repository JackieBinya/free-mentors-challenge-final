const sessions = [];


const clippers = document.querySelectorAll('.clipper');
const displayBtns = document.querySelectorAll('.display-btn');
const moreBtns = document.querySelectorAll('.more');
const hideBtns = document.querySelectorAll('.hide');
const sidebarNav = document.querySelector('.sidebar-nav');

document.querySelector('.open-btn').addEventListener('click', (e) => {
  sidebarNav.style.display = 'block';
  setTimeout(() => sidebarNav.style.display = 'none', 30000);
});

document.querySelector('.close-btn').addEventListener('click', (e) => {
  sidebarNav.style.display = 'none';
});

for (let i = 0; i < moreBtns.length; i++) {
  moreBtns[i].addEventListener('click', (e) => {
    for (let j = 0; j < displayBtns.length; j++) {
      if (displayBtns[j] === moreBtns[i].parentElement) {
        for (let z = 0; z < clippers.length; z++) {
          if (clippers[z].parentElement === displayBtns[j].parentElement.parentElement) {
            displayBtns[j].style.display = 'none';
            clippers[z].style.display = 'block';
          }
        }
      }
    }
  });
}

for (let i = 0; i < hideBtns.length; i++) {
  hideBtns[i].addEventListener('click', (e) => {
    for (let j = 0; j < displayBtns.length; j++) {
      if (displayBtns[j].parentElement.parentElement === hideBtns[i].parentElement.parentElement.parentElement) {
        for (let z = 0; z < clippers.length; z++) {
          if (clippers[z].parentElement === displayBtns[j].parentElement.parentElement) {
            clippers[z].style.display = 'none';
            displayBtns[j].style.display = 'block';
          }
        }
      }
    }
  });
}
