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
        const cartBadgeQuan = await $('.shopping_cart_badge')
        await expect(cartBadgeQuan).toBeDisplayedInViewport()
        const spanText = await $('.shopping_cart_badge')
        const numberCartText = await spanText.getText()
        expectChai(numberCartText).to.equal('1')

        const burgerButton = await $('#react-burger-menu-btn')
        await burgerButton.click()

        const leftSidebar = await $('.bm-menu-wrap')
        await expect(leftSidebar).toBeDisplayedInViewport()
        await expect(await $('#inventory_sidebar_link')).toBeDisplayedInViewport()
        await expect(await $('#about_sidebar_link')).toBeDisplayedInViewport()
        await expect(await $('#logout_sidebar_link')).toBeDisplayedInViewport()
        await expect(await $('#reset_sidebar_link')).toBeDisplayedInViewport()

        await $('#logout_sidebar_link').click()
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

        const CartShop = await $('#shopping_cart_container')
        await expect(CartShop).toBeDisplayedInViewport()

        const itemDescLabl = await $$('.inventory_item_description')
        await expect(itemDescLabl).toBeDisplayed()

        const itemName = await $$('.inventory_item_name')
        await expect(itemName).toBeDisplayed()

        const itemDescDesc = await $$('.inventory_item_desc')
        await expect(itemDescDesc).toBeDisplayed()

        const itemButtonSmall = await $$('.btn.btn_primary.btn_small.btn_inventory')
        await expect(itemButtonSmall).toBeDisplayed()
        const itemButtonSnd = await $$('.inventory_item_price')
        await expect(itemButtonSnd).toBeDisplayed()
        const itemImg = await $$('.inventory_item_img')
        await expect(itemImg).toBeDisplayed()

        await expect(await $('.inventory_item_name')).toBeDisplayed()
        });
});