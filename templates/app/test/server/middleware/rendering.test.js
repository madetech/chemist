describe('Middleware', function () {
  describe('Server Side Rendering Middleware', function () {
    it('should render the React component for a route on the server', async function () {
      const html = await fetchival(`${APP_HOST}/`, { responseAs: 'text' }).get()
      expect(html).to.include('Todos')
    })

    it('should render the 404 page if no others are found', async function () {
      try {
        await fetchival(`${APP_HOST}/this-page-probably-wont-exist`, { responseAs: 'text' }).get()
      } catch ({ response }) {
        expect(response.status).to.eq(404)
      }
    })
  })
})
