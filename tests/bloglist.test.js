const listHelper  =  require('../utils/for_testing')

test('dummy returns one',()=>{
    const blogs = []
    expect(listHelper.dummy(blogs)).toBe(1)
})