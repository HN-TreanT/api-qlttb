const reponseSuccess = ({ res }) => {
  return res.status(200).json({
    status: true,
    message: "success",
  });
};

const responseServerError = ({ res, err }) => {
  return res.status(500).json({
    status: false,
    error: err,
  });
};

const responseInValid = ({ res, message }) => {
  return res.status(200).json({
    status: false,
    message: message,
  });
};

const responseSuccessWithData = ({ res, data }) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: data,
  });
};

const responseUnthorized = ({ res }) => {
  return res.status(401).json({
    status: false,
    message: "Unthorized",
  });
};

const reponseForbidden = ({ res }) => {
  return res.status(403).json({
    status: false,
    message: "Forbidden",
  });
};

module.exports = {
  reponseSuccess,
  responseInValid,
  responseServerError,
  responseSuccessWithData,
  responseUnthorized,
  reponseForbidden,
};
