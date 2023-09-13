describe('Tests for login page', () => {
    it('Valid login', async () => {
        await browser.url('')
        const usernameInput = await $('[data-test="username"]')
        await usernameInput.setValue('standard_user')
        const passInput = await $('[data-test="password"]')
        await passInput.setValue('secret_sauce')
        const loginBtn = await $('[data-test="login-button"]')
        await loginBtn.click()
        await expect(browser).toHaveUrlContaining('/inventory.html')
        const inventoryItem = await $('.inventory_item')
        await expect(inventoryItem).toBeDisplayed()
    })
})