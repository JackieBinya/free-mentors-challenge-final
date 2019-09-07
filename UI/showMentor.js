const sidebarNav = document.querySelector('.sidebar-nav');

document.querySelector('.open-btn').addEventListener('click', (e) => {
  sidebarNav.style.display = 'block';
  setTimeout(() => sidebarNav.style.display = 'none', 30000);
});

document.querySelector('.close-btn').addEventListener('click', (e) => {
  sidebarNav.style.display = 'none';
});

const mentors = [
  {
    firstName: 'Ntombi',
    lastName: 'Makhalisa',
    occupation: 'Software Developer',
    expertise: 'Javascript, React, Angular, Python',
    bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
    imageUrl: './assets/card00.jpg',
    id: 1,
  },

  {
    firstName: 'Matthew',
    lastName: 'Nkunzi',
    occupation: 'Software Developer',
    expertise: 'Javascript, React, Angular, Python',
    bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
    imageUrl: './assets/card01.jpg',
    id: 2,
  },

  {
    firstName: 'Limukani',
    lastName: 'Mthombeni',
    occupation: 'Software Developer',
    expertise: 'Javascript, React, Angular, Python',
    bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
    imageUrl: './assets/card02.jpg',
    id: 3,
  },

  {
    firstName: 'Wendy',
    lastName: 'De`Watt',
    occupation: 'Software Developer',
    expertise: 'Javascript, React, Angular, Python',
    bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
    imageUrl: './assets/card03.jpg',
    id: 4,
  },

  {
    firstName: 'Arya',
    lastName: 'Mpala',
    occupation: 'Software Developer',
    expertise: 'Javascript, React, Angular, Python',
    bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
    imageUrl: './assets/card04.jpg',
    id: 5,
  },

  {
    firstName: 'Kuzivakwashe',
    lastName: 'Nyandoro',
    occupation: 'Software Developer',
    expertise: 'Javascript, React, Angular, Python',
    bio: 'I am a full-stack Web Application Developer and Software Developer. I have a Bachelor of Science in Computer Science from University of Capetown, and my primary focus and inspiration for my studies is Web Development. In my free time, I study human computer interface and the psychology of human computer interaction. I am both driven and self-motivated, and I am constantly experimenting with new technologies and techniques. I am very passionate about Web Development, and strive to better myself as a developer, and the development community as a whole.',
    imageUrl: './assets/card05.jpg',
    id: 6,
  },
];

const imageContainer = document.querySelector('.image-container');

const getUrlParameter = (sParam) => {
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split('&');
  for (let i = 0; i < sURLVariables.length; i++)
  {
    let sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
    {
      return sParameterName[1];
    }
  }
};

window.onload = () => {
  const id = getUrlParameter('id');
  const mentor = mentors.find(mentor => mentor.id == id);

  const myImage = new Image();
  myImage.src = mentor.imageUrl;
  imageContainer.prepend(myImage);

  const props = Object.keys(mentor);

  props.forEach((key) => {
    const elem = document.querySelectorAll(`[data-${key}-value]`);
    if (elem.length) return elem[0].textContent = mentor[key];
  });
};
