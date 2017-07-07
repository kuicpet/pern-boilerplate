const chooseLogin = jQuery('#chooseLogin');
const chooseSignup = jQuery('#chooseSignup');
const loginSubmit = jQuery('#loginSubmit');
const signupSubmit = jQuery('#signupSubmit');
const resetSubmit = jQuery('#resetSubmit');
const resetSuccess = jQuery('#resetSuccess');

resetSuccess.hide();

chooseLogin.on('click', () => {
  window.location = 'signin.html';
});

chooseSignup.on('click', () => {
  window.location = 'signup.html';
});

loginSubmit.on('click', () => {
  window.location = 'userboard.html';
});

signupSubmit.on('click', () => {
  window.location = 'userboard.html';
});

resetSubmit.on('click', () => {
  resetSuccess.show();
});

$('#slide-submenu').on('click', function () {			        
  $(this).closest('.list-group').fadeOut('slide', function (){
    $('.mini-submenu').fadeIn();	
  });        
});

$('.mini-submenu').on('click',function(){		
  $(this).next('.list-group').toggle('slide');
  $('.mini-submenu').hide();
})