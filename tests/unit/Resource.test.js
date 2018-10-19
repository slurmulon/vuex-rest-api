import axios from "axios"
import Resource from "../../dist/Resource"
import Axios from "axios";

test("commit strings will be transformed", () => {
  const commitStrings = new Map([
    ["getPosts", "GET_POSTS"],
    ["yetAnotherPost", "YET_ANOTHER_POST"],
    ["cyber", "CYBER"]
  ])

  const getCommitString = Resource.prototype.getCommitString

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

  const getDispatchString = Resource.prototype.getDispatchString

  dispatchStrings.forEach((should, is) => {
    expect(getDispatchString(is)).toBe(should)
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
