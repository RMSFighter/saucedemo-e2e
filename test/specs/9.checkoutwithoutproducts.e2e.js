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
    it.skip('Empty cart test', async() => {
        await $('#shopping_cart_container').click()

        await $('#checkout').click()

        await $('#first-name').setValue('Nani')
        await $('#last-name').setValue('Unreal')
        await $('#postal-code').setValue('745198914')
        await $('#continue').click()

        await $('#finish').click()
        const errorElement = await $('//*[contains(text(),"Cart is empty")]')
        const errorText = await errorElement.getText()
        expectChai(errorText).to.equal('Cart is empty')  
    });
});