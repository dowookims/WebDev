describe("PAGE START", () => {
    beforeAll(async (done) => {
        await page.goto(URL, { waitUntil: 'domcontentloaded' });
        done()
    });

    test("TITLE OF THE PAGE", async () => {
        const title = await page.title();
        expect(title).toBe("KNOWRE PAD");
        
    }),

    test("user login success", async () => {
        page.on('dialog', async dialog => {
            const message = dialog.message();
            if (message === "아이디를 입력하세요") {
                await dialog.accept('knowre')
            } else {
                await dialog.accept('dev')
            }
        })
        await page.click(".login");
        const iconArr = await page.$$('.icon');
        expect(iconArr.length).toBe(4);
    })
})