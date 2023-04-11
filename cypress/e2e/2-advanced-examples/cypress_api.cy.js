/// <reference types="cypress" />

context('Cypress.Commands', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  // https://on.cypress.io/custom-commands

  it('.add() - create a custom command', () => {
    Cypress.Commands.add('console', {
      prevSubject: true, // Boolean ， String 或 Array
    }, (subject, method) => {
      // the previous subject is automatically received
      // and the commands arguments are shifted

      // allow us to change the console method used
      method = method || 'log'

      // log the subject to the console
      console[method]('The subject is', subject)

      // whatever we return becomes the new subject
      // we don't want to change the subject so
      // we return whatever was passed in
      return subject
    })

    // 通過設置 { prevSubject: true } ，新的 .console() 命令將需要一個主題。
    cy.get('button').console('info').then(($button) => {
      // subject is still $button
    })
  })
})

context('Cypress.Cookies', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  // https://on.cypress.io/cookies
  it('.debug() - enable or disable debugging', () => {
    // cy.debug().getCookie('fakeCookie') // 在命令開始時暫停調試
    // cy.getCookie('fakeCookie').debug() // 調試`get`命令時暫停
    Cypress.Cookies.debug(true) // 紀錄Cookies變化
    // Cypress will now log in the console when
    // cookies are set or cleared
    cy.setCookie('fakeCookie', '123ABC')
    cy.clearCookie('fakeCookie')
    cy.setCookie('fakeCookie', '123ABC')
    cy.clearCookie('fakeCookie')
    cy.setCookie('fakeCookie', '123ABC')
  })
})

context('Cypress.arch', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  it('Get CPU architecture name of underlying OS', () => {
    // https://on.cypress.io/arch
    expect(Cypress.arch).to.exist
    //  Node 的 os.arch()返回 [返回操作系統 CPU 架構，可能的值有 "x64"、"arm" 和 "ia32"。]
  })
})

context('Cypress.config()', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  it('Get and set configuration options', () => {
    // https://on.cypress.io/config
    let myConfig = Cypress.config()

    expect(myConfig).to.have.property('animationDistanceThreshold', 5)
    expect(myConfig).to.have.property('baseUrl', null)
    expect(myConfig).to.have.property('defaultCommandTimeout', 4000)
    expect(myConfig).to.have.property('requestTimeout', 5000)
    expect(myConfig).to.have.property('responseTimeout', 30000)
    expect(myConfig).to.have.property('viewportHeight', 660)
    expect(myConfig).to.have.property('viewportWidth', 1000)
    expect(myConfig).to.have.property('pageLoadTimeout', 60000)
    expect(myConfig).to.have.property('waitForAnimations', true)

    expect(Cypress.config('pageLoadTimeout')).to.eq(60000)

    // this will change the config for the rest of your tests!
    Cypress.config('pageLoadTimeout', 20000)

    expect(Cypress.config('pageLoadTimeout')).to.eq(20000)

    Cypress.config('pageLoadTimeout', 60000)
  })
})

context('Cypress.dom', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  // https://on.cypress.io/dom
  it('.isHidden() - determine if a DOM element is hidden', () => {
    let hiddenP = Cypress.$('.dom-p p.hidden').get(0)
    let visibleP = Cypress.$('.dom-p p.visible').get(0)

    // our first paragraph has css class 'hidden'
    expect(Cypress.dom.isHidden(hiddenP)).to.be.true // isHidden 是否隱藏
    expect(Cypress.dom.isVisible(visibleP)).to.be.true // isVisible 是否可見

  })
})

context('Cypress.env()', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  // We can set environment variables for highly dynamic values

  // https://on.cypress.io/environment-variables
  it('Get environment variables', () => {
    // https://on.cypress.io/env
    // set multiple environment variables
    Cypress.env({
      host: 'veronica.dev.local',
      api_server: 'http://localhost:8888/v1/',
    })

    // get environment variable
    expect(Cypress.env('host')).to.eq('veronica.dev.local')

    // set environment variable
    Cypress.env('api_server', 'http://localhost:8888/v2/')
    expect(Cypress.env('api_server')).to.eq('http://localhost:8888/v2/')

    // get all environment variable - Cypress.env()
    expect(Cypress.env()).to.have.property('host', 'veronica.dev.local')
    expect(Cypress.env()).to.have.property('api_server', 'http://localhost:8888/v2/')
  })
})

context('Cypress.log', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  it('Control what is printed to the Command Log', () => {
    // https://on.cypress.io/cypress-log
    Cypress.log({
      name: 'test-setLog',
      displayName: 'setLog', // 命令日誌的簡稱
      message: `hello cypress`,
    })
    // cy.log('message')
    // cy.log('another message', ['one', 'two', 'three'])

    // cy.task('log', 'This will be output to the terminal') // 顯示在終端機，須先設定config
    // cy.task('hello', { greeting: 'Hello', name: 'World' })
  })
})

context('Cypress.platform', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  it('Get underlying OS name', () => {
    // https://on.cypress.io/platform
    expect(Cypress.platform).to.be.exist  // Cypress.platform = 'darwin' 返回的底層操作系統名稱
  })
})

context('Cypress.version', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  it('Get current version of Cypress being run', () => { // cypress 版本
    // https://on.cypress.io/version
    expect(Cypress.version).to.be.exist
  })
})

context('Cypress.spec', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api')
  })

  it('Get current spec information', () => { // 返回所測試規範的屬性
    // https://on.cypress.io/spec
    // wrap the object so we can inspect it easily by clicking in the command log
    cy.wrap(Cypress.spec).should('include.keys', ['name', 'relative', 'absolute'])
  })
})
