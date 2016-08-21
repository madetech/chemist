feature('Visiting the homepage', function (scenario) {
  scenario('will display a welcome message', function* (page) {
    page.visit('/')
    yield () => expect(page.body).to.include.text('Welcome to Chemist!')
  })
})
