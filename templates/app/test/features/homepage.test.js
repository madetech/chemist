feature('Visiting the homepage', function (scenario) {
  scenario('will greet the user', function* (page) {
    page.visit('/')
    yield () => expect(page.body).to.include.text('Welcome to Chemist!')
  })
})
