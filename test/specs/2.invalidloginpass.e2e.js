import { expect as expectChai } from 'chai'
describe('Tests for login page', () => {
    it('Invalid login pass', async () => {
        await browser.url('')

        const usernameInput = await $('[data-test="username"]')
        await usernameInput.setValue('standard_user')
        const usernameInputValue = await usernameInput.getValue()
        expectChai(usernameInputValue).to.equal('standard_user')

        const passwordInput = await $('[data-test="password"]')
        await passwordInput.setValue('secret_sauce3')
        const passwordInputType = await passwordInput.getAttribute('type')
        expectChai(passwordInputType).to.equal('password')
        
        const loginBtn = await $('[data-test="login-button"]')
        await loginBtn.click()
        const usernameErrorIcon = await $('[data-test="username"] + svg.error_icon')
        await expect(usernameErrorIcon).toBeDisplayed()
        const passwordErrorIcon = await $('[data-test="password"] + svg.error_icon')
        await expect(passwordErrorIcon).toBeDisplayed()
        const messageErrorSad = await $('[data-test="error"]')
        await expect(messageErrorSad).toBeDisplayed()
        await expect(messageErrorSad).toHaveText('Epic sadface: Username and password do not match any user in this service')
        const usernameBorderBottomCol = await usernameInput.getCSSProperty('border-bottom-color')
        expectChai(usernameBorderBottomCol.parsed.hex).to.equal('#e2231a')
        const passwordBorderBottomCol = await passwordInput.getCSSProperty('border-bottom-color')
        expectChai(passwordBorderBottomCol.parsed.hex).to.equal('#e2231a')
    })
})