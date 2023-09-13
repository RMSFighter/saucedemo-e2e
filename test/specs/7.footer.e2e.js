import { expect as expectChai } from 'chai'
describe ('Test for the footer', () => {
    before(async () => {
        await browser.url('')
        const usernameInput = await $('[data-test="username"]')
        await usernameInput.setValue('standard_user')
        const passwordInput = await $('[data-test="password"]')
        await passwordInput.setValue('secret_sauce')
        const loginBtn = await $('[data-test="login-button"]')
        await loginBtn.click()
    });
    it('Footer test', async () => {
        const twitter = await $('.social_twitter')
        await twitter.click()
        await browser.switchWindow('https://twitter.com/saucelabs')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')
        
        const facebook = await $('.social_facebook')
        await facebook.click()
        await browser.switchWindow('https://www.facebook.com/saucelabs')
        const facebookH = await $('//h1[contains(text(),"Sauce Labs")]')
        await expect(facebookH).toBeExisting()
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')

        const linkedIn = await $('.social_linkedin')
        await linkedIn.click()
        await browser.switchWindow('https://www.linkedin.com/company/sauce-labs/')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')                            
    })
})