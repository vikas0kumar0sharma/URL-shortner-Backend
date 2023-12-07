const { getUser } = require("../service/auth");

function checkForAuthentication(req,res,next){
  //const authorizationHeaderValue=req.headers["authorization"]
  const tokenCookie=req.cookies?.token
  req.user=null

  // if(
  //   !authorizationHeaderValue ||
  //   authorizationHeaderValue.startsWith("Bearer")
  // ) return next()

  if(!tokenCookie) return next()

  //const token=userUid.split("Bearer ")[1]
  const token=tokenCookie
  const user = getUser(token);

  req.user=user
  return next()
}

function restrictTo(roles=[]){
  return function(req,res,next){
    if(!req.user) return res.redirect("/login")

    if(!roles.includes(req.user.role)) return res.end("UnAuthorized")

    return next()
  }
}

module.exports = {
  checkForAuthentication,restrictTo
};
