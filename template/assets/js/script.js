$('.navTrigger').click(function () {
  $(this).toggleClass('active')
  $('#mainNav').toggleClass('mobileNav')
  console.log('Clicked menu')
  $('#mainListDiv').toggleClass('show_list')
  $('#mainListDiv').fadeIn()
})
