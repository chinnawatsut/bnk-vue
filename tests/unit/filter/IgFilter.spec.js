import IgFilter from '../../../src/filter/IgFilter'
describe("IgFilter", () => {

  it("should append account to ig url", () => {
    const account = "kygomusic"
    const expecting = "https://www.instagram.com/kygomusic"

    const url = IgFilter.iglink(account)

    expect(url).toEqual(expecting);
  });

  it("should get empty string when no value", () => {
    const account = null
    const expecting = ""

    const url = IgFilter.iglink(account)

    expect(url).toEqual(expecting);
  })
})