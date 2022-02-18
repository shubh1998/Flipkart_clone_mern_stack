// The error returned by this function is handled in the error handler middleware in app.js.
createStatusCodeError = function(res, statusCode, message) {
  return res.status(statusCode || 400).json({
    success: false,
    data: null,
    message
  });
};

//-------------- Success Response handlers ----- 200 ------
successResponse = function(res, code, data, message) {
  return res.status(code || 200).json({
    success: true,
    data,
    message
  });
};


//---- The 400 Bad Request error----------
badRequestError = function(res, msg) {
  return createStatusCodeError(res, 400, msg);
};

notFoundError = function(res, msg) {
  return createStatusCodeError(res, 404, msg);
};

//----------------The 200 - Sucess Response
okResponse = function(res, data, message) {
  res.statusCode = 200;
  if (!message) {
    message = "";
  }
  return successResponse(res, 200, data, message);
};

//-------The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource.-----
createdResponse = function(res, data, message) {
  return successResponse(res, 201, data, message);
};
