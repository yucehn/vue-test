/// <reference types="cypress" />

context('Misc', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/misc')
  })

  it('.end() - end the command chain', () => {
    // https://on.cypress.io/end

    // cy.end is useful when you want to end a chain of commands // 當想結束命令鏈時
    // and force Cypress to re-query from the root element
    cy.get('.misc-table').within(() => {
      // ends the current chain and yields null // 結束當前鏈並產生 null
      cy.contains('Cheryl').click().end()

      // queries the entire table again // 再次查詢整個表
      cy.contains('Charles').click()
    })
  })

  it('cy.exec() - execute a system command', () => {
    // execute a system command.
    // so you can take actions necessary for
    // your test outside the scope of Cypress.
    // https://on.cypress.io/exec

    // we can use Cypress.platform string to
    // select appropriate command
    // https://on.cypress/io/platform
    cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`)

    // on CircleCI Windows build machines we have a failure to run bash shell
    // https://github.com/cypress-io/cypress/issues/5169
    // so skip some of the tests by passing flag "--env circle=true"
    const isCircleOnWindows = Cypress.platform === 'win32' && Cypress.env('circle')

    if (isCircleOnWindows) {
      cy.log('Skipping test on CircleCI')

      return
    }

    // cy.exec problem on Shippable CI
    // https://github.com/cypress-io/cypress/issues/6718
    const isShippable = Cypress.platform === 'linux' && Cypress.env('shippable')

    if (isShippable) {
      cy.log('Skipping test on ShippableCI')

      return
    }

    // TODO 排除錯誤
    // cy.exec('echo Jane Lane')
    //   .its('stdout').should('contain', 'Jane Lane')

    // if (Cypress.platform === 'win32') {
    //   cy.exec(`print ${Cypress.config('configFile')}`)
    //     .its('stderr').should('be.empty')
    // } else {
    //   cy.exec(`cat ${Cypress.config('configFile')}`)
    //     .its('stderr').should('be.empty')

    //   cy.exec('pwd')
    //     .its('code').should('eq', 0)
    // }
  })

  it('cy.focused() - get the DOM element that has focus', () => {
    // https://on.cypress.io/focused
    cy.get('.misc-form').find('#name').click()
    cy.focused().should('have.id', 'name')

    cy.get('.misc-form').find('#description').click()
    cy.focused().should('have.id', 'description')
  })

  context('Cypress.Screenshot', function () {
    it('cy.screenshot() - take a screenshot', () => {
      // 截取被測應用程序的屏幕截圖
      // https://on.cypress.io/screenshot
      cy.screenshot('my-image') // fileName ; cy.screenshot(fileName, options)
    })

    it('Cypress.Screenshot.defaults() - change default config of screenshots', function () {
      Cypress.Screenshot.defaults({
        blackout: ['.banner'],
        // 與指定選擇器匹配的元素將從屏幕截圖中塗黑，但僅當 capture 選項為 viewport 時才是如此。
        // 如果 capture 選項為 runner ,則忽略 blackout 。
        capture: 'viewport', 
        // viewport:被測試的應用程序將捕獲到當前視口中。
        // fullPage: 將從上至下完整捕獲被測應用程序。
        // runner: 將捕獲整個瀏覽器視口，包括Cypress命令日誌。對於在測試失敗時自動獲取的屏幕截圖，捕獲始終強制給 runner 。
        clip: { x: 0, y: 0, width: 300, height: 600 },
        scale: false, // 是否縮放應用程序以適合瀏覽器視口
        disableTimersAndAnimations: true, // 如果為true，則在截屏時禁止JavaScript計時器（ setTimeout ， setInterval 等）和CSS動畫運行。
        screenshotOnRunFailure: true, // 在 cypress run 失敗時自動獲取屏幕截圖。
        onBeforeScreenshot ($el) {
          // const $banner = $el.find('.banner')
          // if ($banner) {
          //   $banner.hide()
          // }
         },
        onAfterScreenshot ($el, props) { 
          // const $banner = $el.find('.banner')
          // if ($banner) {
          //   $banner.show()
          // }
          // console.log('props', props)
        },
      })
    })
  })

  it('cy.wrap() - wrap an object', () => {
    // cy.wrap(subject, options) >>> 產生傳遞給 .wrap() 的對象。如果對像是一個承諾，則產生其確定的值。
    // https://on.cypress.io/wrap
    cy.wrap({ foo: 'bar' })
      .should('have.property', 'foo')
      .and('include', 'bar')

    })

  const myPromise = new Promise((resolve, reject) => {
    // 使用 setTimeout(...) 來模擬異步代碼
    setTimeout(() => {
      resolve({
        type: 'success',
        message: 'It worked!',
      })
    }, 2500)
  })
  
  it('should wait for promises to resolve', () => {
    cy.wrap(myPromise).its('message').should('eq', 'It worked!')
  })
})
