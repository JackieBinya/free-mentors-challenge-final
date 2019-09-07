const sidebarNav = document.querySelector('.sidebar-nav')

document.querySelector('.open-btn').addEventListener('click', e => {
  sidebarNav.style.display = 'block';
  setTimeout(() => sidebarNav.style.display = 'none', 30000);
});

document.querySelector('.close-btn').addEventListener('click', e => {
    sidebarNav.style.display = 'none';
  });

  document.querySelector('.sidebar-nav-logo').addEventListener('click', e =>{
    sidebarNav.style.display = 'none';
  });

  