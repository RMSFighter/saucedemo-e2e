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
    it('Cart test', async () => {
        const itemBackpack = await $('#add-to-cart-sauce-labs-backpack')
        await itemBackpack.click()
        const itemLight = await $('#add-to-cart-sauce-labs-bike-light')
        await itemLight.click()
        const cartBadgeQuan = await $('.shopping_cart_badge')
        await expect(cartBadgeQuan).toBeDisplayedInViewport()
        const spanText = await $('.shopping_cart_badge')
        const numberCartText = await spanText.getText()
        expectChai(numberCartText).to.equal('2')
    });
    it('Cart page test', async()=>{
        const cartClick = await $('#shopping_cart_container')
        await cartClick.click()
        const cartlist = await $('.cart_list')
        await expect(cartlist).toBeDisplayed()
    });
    it('Checkout form', async() => {
        const checkoutButton = await $('#checkout')
        await checkoutButton.click()
        const checkoutForm = await $('#checkout_info_container')
        await expect(checkoutForm).toBeDisplayed()
        await $('#first-name').setValue('Nani')
        await $('#last-name').setValue('Unreal')
        await $('#postal-code').setValue('745198914')
        await $('#continue').click()
        const inventoryText = await $('.summary_subtotal_label').getText()
        const inventoryNumber = parseFloat(inventoryText.split(' ').pop().replace('$', ''))
        const arrCartItem = await $$('.inventory_item_price')
        const textValuesCartItem = [];

        for (const element of arrCartItem) {
            const text = await element.getText();
            const text2 =  parseFloat(text.split(' ').pop().replace('$', ''))
            textValuesCartItem.push(text2);
        }
        const sum = textValuesCartItem.reduce((x, t) => x + t, 0);
        expectChai(sum).to.equal(inventoryNumber)

    });
    it('Checkout complete', async() =>{
        await $('#finish').click()
        const checkoutTnks = await browser.getUrl()
        expectChai(checkoutTnks).to.equal('https://www.saucedemo.com/checkout-complete.html')
        const thanks = await $('.complete-header')
        await expect(thanks).toHaveText('Thank you for your order!')
    });
});

