describe("PAGE START", () => {
    beforeEach(async () => {
        await page.goto(URL, { waitUntil: 'domcontentloaded' });
    })

    afterEach(async() => {
        await jestPuppeteer.resetPage();
    })

    test("#1. TITLE OF THE PAGE", async () => {
        const title = await page.title();
        expect(title).toBe("KNOWRE PAD");
    }),

    describe("#2. USER LOGIN", () => {
        test("#2-1. user login success", async () => {
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
    }),

    test("#3 login failed", async () => {
        let isLogin = true;
        page.on('dialog', async dialog => {
            const message = dialog.message();
            if (message === "아이디를 입력하세요") {
                await dialog.accept('knowre')
            } else if (message === "아이디 또는 비밀번호가 틀렸습니다.") {
                isLogin = false
                await dialog.accept()
            }else {
                await dialog.accept('devu')
            } 
        })
        await page.click(".login");
        expect(isLogin).toBeFalsy()
    })
})