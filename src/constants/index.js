const EQUAL = "EQUAL";
const START_WITH = "START_WITH";
const INCLUDE = "INCLUDE";
const typesMap = {
  EQUAL,
  START_WITH,
  INCLUDE
};
exports.typesMap = typesMap;
exports.types = Object.keys(typesMap);

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";
const methodsMap = {
  GET,
  POST,
  PUT,
  DELETE
};
exports.methodsMap = methodsMap;
exports.methods = Object.keys(methodsMap);
