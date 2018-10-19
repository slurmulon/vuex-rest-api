import axios from "axios"
import Resource from "../../dist/Resource"

test("commit strings will be transformed", () => {
  const commitStrings = new Map([
    ["getPosts", "GET_POSTS"],
    ["yetAnotherPost", "YET_ANOTHER_POST"],
    ["cyber", "CYBER"]
  ])

  const { getCommitString } = Resource.prototype

  commitStrings.forEach((should, is) => {
    expect(getCommitString(is)).toBe(should)
  })
})

test("dispatch strings will be transformed", () => {
  const dispatchStrings = new Map([
    ["getPosts", "getPosts"],
    ["yetAnotherPost", "yetAnotherPost"],
    ["cyber", "cyber"]
  ])

  const { getDispatchString } = Resource.prototype

  dispatchStrings.forEach((should, is) => {
    expect(getDispatchString(is)).toBe(should)
  })
})

describe("add", () => {
  describe("options", () => {
    const opts = { action: "foo"}
    const resource = new Resource({}).add(opts)

    test("sets `method` to 'get' by default", () => {
      expect(opts.method).toBe("get")
    })

    test("sets `requestConfig` to an empty object by default", () => {
      expect(opts.requestConfig).toEqual({})
    })

    test("sets `property` to `null` by default", () => {
      expect(opts.property).toBe(null)
    })
  })

  describe("actions", () => {
    describe("requestFn", () => {

    })

    describe("property", () => {
      it("should be set to `options.property`", () => {
        const opts = { action: "foo", property: "bar" }
        const resource = new Resource({}).add(opts)

        expect(resource.actions["foo"].property).toBe("bar")
      })
    })

    describe("onSuccess", () => {
      it("should be set to `options.onSuccess", () => {
        const stub = () => {}
        const opts = { action: "foo", onSuccess: stub }
        const resource = new Resource({}).add(opts)

        expect(resource.actions["foo"].onSuccess).toBe(stub)
      })
    })

    describe("onError", () => {
      it("should be set to `options.onError`", () => {
        const stub = () => {}
        const opts = { action: "foo", onError: stub }
        const resource = new Resource({}).add(opts)

        expect(resource.actions["foo"].onError).toBe(stub)
      })
    })

    describe("dispatchString", () => {

    })

    describe("commitString", () => {

    })

    describe("axios", () => {
      it("should be set to `this.axios`", () => {

      })
    })
  })

  test("illegal HTTP method", () => {
    const opts = { action: "foo", method: "invalid" }
    const resource = new Resource(opts)
    const add = () => resource.add(opts)

    expect(add).toThrowError(/Illegal HTTP method set/)
  })
})

describe("normalizedBaseURL", () => {
  test("is empty string if no axios base url or Vapi base url is set", () => {
    const resource = new Resource({})

    expect(resource.normalizedBaseURL).toBe("")
  })

  test("is base url if Resource base url is set", () => {
    const resource = new Resource({
      baseURL: "https://resourceurl.com"
    })

    expect(resource.normalizedBaseURL).toBe("https://resourceurl.com")
  })

  test("is Resource base url (higher precedence than axios base url)", () => {
    const axiosInstance = axios.create({
      baseURL: "https://axiosurl.com"
    })

    const resource = new Resource({
      baseURL: "https://resourceurl.com"
    })

    expect(resource.normalizedBaseURL).toBe("https://resourceurl.com")
  })

  test("is axios base url if Resource base url is not set but axios base url", () => {
    const axiosInstance = axios.create({
      baseURL: "https://axiosurl.com"
    })

    const resource = new Resource({
      axios: axiosInstance
    })

    expect(resource.normalizedBaseURL).toBe("https://axiosurl.com")
  })
})
