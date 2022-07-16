function isEmpty(value) {
  return !value && value.trim() !== '';
}
function userCredentailsAreValid(email, password) {
  return email && email.includes('@') && password.trim().length >= 6;
}
function userDetailsAreValid(email, password, name, street, postal, city) {
  return (
    userCredentailsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmedEmail) {
  return email === confirmedEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
