export interface QueryComponents {
  method: string,
  path: string,
  action: string,
  property?: string,
  pathParams: Array<string>
}

class QueryParser {

  // validates a single query and groups its components
  private static validationRegex =
    /^(?<method>\w+)\s+(?<url>.*)\s+AS\s+(?<action>\w+)(?:\s+INTO\s+(?<property>\w+))?$/

  // finds all parameters in an URL
  private static pathParamRegex = /(?<=:)(?<param>\w+)/g

  static validate(query: string): RegExpExecArray {
    const match = this.validationRegex.exec(query)
    return match
  }

  static parse(match: RegExpExecArray): QueryComponents {
    return {
      method: match[1],
      path: match[2],
      pathParams: this.parsePathParams(match[2]),
      action: match[3],
    }
  }

  private static parsePathParams(action: string): Array<string> {
    const match = action.match(this.pathParamRegex)
    if (match === null) {
      return []
    }

    return match
  }
}

export default QueryParser