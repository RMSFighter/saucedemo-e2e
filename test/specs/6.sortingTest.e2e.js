import { expect as expectChai } from 'chai'
describe('Price Sorting Test', async () => {
    before(async () => {
        await browser.url('')
        const usernameInput = await $('[data-test="username"]')
        await usernameInput.setValue('standard_user')
        const passInput = await $('[data-test="password"]')
        await passInput.setValue('secret_sauce')
        const loginBtn = await $('[data-test="login-button"]')
        await loginBtn.click()
    })
    it('AZ', async () => {
        const arrList = await $$('.inventory_item_name')   
        for (let i = 0; i < arrList.length - 1; i++) {
            const currertElTxt = await arrList[i].getText()
            const nextElTxt = await arrList[i + 1].getText()
            expectChai(nextElTxt >= currertElTxt).to.be.true
        };
    });
    it('ZA', async () => {  
        const ddlist = await $('.product_sort_container')
        await ddlist.selectByVisibleText('Name (Z to A)')

        const arrList = await $$('.inventory_item_name') 
        for (let i = 0; i < arrList.length - 1; i++) {
            const currertElTxt = await arrList[i].getText()
            const nextElTxt = await arrList[i + 1].getText()
            expectChai(currertElTxt >= nextElTxt).to.be.true
        }
    });   
    it('Price low to high', async () => {  
        const ddlist = await $('.product_sort_container')
        await ddlist.selectByVisibleText('Price (low to high)')

        const arrList = await $$('.inventory_item_price') 
        for (let i = 0; i < arrList.length - 1; i++) {
            const currertElPriceTxt = await arrList[i].getText()
            const nextElPriceTxt = await arrList[i + 1].getText()
            const currertElPrice = parseFloat(currertElPriceTxt.replace('$', ''));
            const nextElPrice = parseFloat(nextElPriceTxt.replace('$', ''));
            expectChai(nextElPrice).to.be.gte(currertElPrice)
        }
    });
    it('Price high to low', async () => {  
        const ddlist = await $('.product_sort_container')
        await ddlist.selectByVisibleText('Price (high to low)')

        const arrList = await $$('.inventory_item_price') 
        for (let i = 0; i < arrList.length - 1; i++) {
            const currertElPriceTxt = await arrList[i].getText()
            const nextElPriceTxt = await arrList[i + 1].getText()
            const currertElPrice = parseFloat(currertElPriceTxt.replace('$', ''));
            const nextElPrice = parseFloat(nextElPriceTxt.replace('$', ''));
            expectChai(currertElPrice).to.be.gte(nextElPrice)
        }
    });     
});