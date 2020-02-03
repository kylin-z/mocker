const constants = require("../../../src/constants");
const typesMap = constants.typesMap;
const db = require("../../db");
const _ = require("lodash");

const matchFunc = new Map([
  [typesMap.EQUAL, (requestUrl, ruleUrl) => requestUrl === ruleUrl],
  [typesMap.START_WITH, (requestUrl, ruleUrl) => requestUrl.startsWith(ruleUrl)],
  [typesMap.INCLUDES, (requestUrl, ruleUrl) => requestUrl.includes(ruleUrl)]
]);

function ruleMatch(requestDetail, rule) {
  const { type } = rule;
  return matchFunc.get(type)(requestDetail.url, rule.url);
}

function getResponse(rules, requestDetail) {
  for (let j = 0; j < rules.length; j++) {
    const rule = rules[j];
    if (rule.status && ruleMatch(requestDetail, rule)) {
      const localResponse = {
        statusCode: 200,
        header: { "Content-Type": "application/json" },
        body: _.result(rule, "response.body")
      };
      return {
        response: localResponse
      };
    }
  }
}

module.exports = {
  summary: "a rule to hack response",
  *beforeSendRequest(requestDetail) {
    const { url } = requestDetail;
    const modules = db.getModules();

    //
    for (let i = 0; i < modules.length; i++) {
      if (url.startsWith(modules[i].url)) {
        const module = modules[i];
        const rules = db.getRules({
          moduleId: module.id
        });
        const mockResponse = getResponse(rules, requestDetail);
        if (!_.isEmpty(mockResponse)) {
          return mockResponse;
        }
        let newOption = requestDetail.requestOptions;
        let proxyConfig = {};
        try {
          let config = JSON.parse(module.proxyConfig);
          if (!_.isEmpty(config)) {
            proxyConfig = config;
          }
        } catch (e) {
          console.log(e)
        }
        return {
          requestOptions: {
            ...newOption,
            ...proxyConfig
          }
        };
      }
    }

    // 没有匹配的module
    const rules = db.getRules().filter(o => o.moduleId === undefined);
    const mockResponse = getResponse(rules, requestDetail);
    if (!_.isEmpty(mockResponse)) {
      return mockResponse;
    }
  }
};
