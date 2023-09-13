import { expect as expectChai } from 'chai'
describe ('Test for the inventory and login page', () => {
    before(async () => {
        await browser.url('')
        const usernameInput = await $('[data-test="username"]')
        await usernameInput.setValue('standard_user')
        const passwordInput = await $('[data-test="password"]')
        await passwordInput.setValue('secret_sauce')
        const loginBtn = await $('[data-test="login-button"]')
        await loginBtn.click()
    });
    it ('Invalid login login', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        const burgerButton = await $('#react-burger-menu-btn')
        await burgerButton.click()

        const leftSidebar = await $('.bm-menu-wrap')
        await expect(leftSidebar).toBeDisplayedInViewport()
        await expect(await $('#inventory_sidebar_link')).toBeDisplayedInViewport()
        await expect(await $('#about_sidebar_link')).toBeDisplayedInViewport()
        await expect(await $('#logout_sidebar_link')).toBeDisplayedInViewport()
        await expect(await $('#reset_sidebar_link')).toBeDisplayedInViewport()

        await $('#logout_sidebar_link').click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        const loginString = await $('[data-test="username"]').getValue()
        const passString = await $('[data-test="password"]').getValue()
        expectChai(loginString).to.equal('')
        expectChai(passString).to.equal('')

        const usernameInput = await $('[data-test="username"]')
        await usernameInput.setValue('standard_user')
        const passwordInput = await $('[data-test="password"]')
        await passwordInput.setValue('secret_sauce')
        const loginBtn = await $('[data-test="login-button"]')
        await loginBtn.click()
    })
})