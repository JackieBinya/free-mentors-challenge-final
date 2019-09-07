const emailRE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
const passwordRE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const nameRE = /[a-zA-Z]{3,}/;


export {
  emailRE,
  passwordRE,
  nameRE,
};
