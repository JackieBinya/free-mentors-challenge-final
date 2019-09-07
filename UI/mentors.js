const sidebarNav = document.querySelector('.sidebar-nav');
const drop00 = document.querySelector('.drop-00');
const dropdownContent = document.querySelector('.dropdown-content');

document.querySelector('.open-btn').addEventListener('click', e => {
  sidebarNav.style.display = 'block';
  setTimeout(() => sidebarNav.style.display = 'none', 30000);
});

document.querySelector('.close-btn').addEventListener('click', e => {
  sidebarNav.style.display = 'none';
})

 /*  document.addEventListener('mousedown', e => {
    const arr = [dropdownContent]
    for(let i=0; i<arr.length; i++){
    if (e.target != i && e.target.parentNode != i) {
      arr[i].style.display = 'none';
    }
  }
  }); */
  const mentors = [
    {
      firstName: 'Ntombi',
      lastName: 'Makhalisa',
      occupation: 'Software Developer',
      expertise: 'Javascript',
      bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
      imageUrl: './assets/card00.jpg',
      id: 1
    },

    {
      firstName: 'Matthew',
      lastName: 'Nkunzi',
      occupation: 'Software Developer',
      expertise: 'Javascript',
      bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
      imageUrl: './assets/card01.jpg',
      id: 2
    },

    {
      firstName: 'Limukani',
      lastName: 'Mthombeni',
      occupation: 'Software Developer',
      expertise: 'Javascript',
      bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
      imageUrl: './assets/card02.jpg',
      id: 3
    },

    {
      firstName: 'Wendy',
      lastName: 'De`Watt',
      occupation: 'Software Developer',
      expertise: 'Javascript',
      bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
      imageUrl: './assets/card03.jpg',
      id: 4
    },

    {
      firstName: 'Arya',
      lastName: 'Mpala',
      occupation: 'Software Developer',
      expertise: 'Javascript',
      bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
      imageUrl: './assets/card04.jpg',
      id: 5
    },

    {
      firstName: 'Kuzivakwashe',
      lastName: 'Nyandoro',
      occupation: 'Software Developer',
      expertise: 'Javascript',
      bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
      imageUrl: './assets/card05.jpg',
      id: 6
    }
  ];

  let cards = document.querySelector('.cards');

  const showCards = (mentors) => {
    for(let i=0; i<mentors.length; i++) {
    let text =  `<div data-key=${mentors[i].id} class='card'>
                      <div class="image-container">
                           <img src=${mentors[i].imageUrl}
                           >
                       </div>
                       <h2>${mentors[i].firstName + ' ' + mentors[i].lastName}</h2>
                       <p class="bio">${mentors[i].bio.replace(/(([^\s]+\s\s*){55})(.*)/,"$1…")}</p>
                   <div/>`;
   const position = 'beforebegin'
    cards.insertAdjacentHTML(position, text);
    }
}

showCards(mentors);

const cardss = document.querySelectorAll('.card');

for(card of cardss){
    card.addEventListener('click', e => {
       // console.log(e.currentTarget.dataset.key)
       window.location.href=`./showMentor.html?id=${e.currentTarget.dataset.key}`;
    });
}
 