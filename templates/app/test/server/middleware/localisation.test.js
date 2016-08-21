describe('Middleware', function () {
  describe('Localisation Middleware', function () {
    it('should translate text based on the locale param', async function () {
      const html = await fetchival(APP_HOST, { responseAs: 'text' }).get({ locale: 'de' })
      expect(html).to.include('Aufgabenliste')
    })

    it('should default to English', async function () {
      const html = await fetchival(APP_HOST, { responseAs: 'text' }).get()
      expect(html).to.include('Todos')
    })
  })
})
