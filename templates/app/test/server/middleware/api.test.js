describe('Middleware', function () {
  describe('API Proxy Middleware', function () {
    it('should proxy requests to the API', async function () {
      const response = await fetch(`${APP_HOST}/api/ping`, { method: 'HEAD' })
      expect(response.status).to.eq(200)
    })
  })
})
