import { createUuid } from './UuidCreator.js'

//如果在浏览器环境中，则自定义test函数，便于后续仿照JEST编写的测试在浏览器中也能运行
if (window.test == undefined) {
  window.test = function (desc, testFn) {
    testFn()
  }
}

// 编写 jest测试 https://jestjs.io/zh-Hans/docs/getting-started
test('1万次循环生成的UUID各不相同', () => {
  //TODO 需要编写
  for (let i = 0; i < 10; i++) {
    //  console.log(createUuid())
  }
})
