import { Request, Response, NextFunction } from "express"
import * as admin from "firebase-admin"
import { DecodedIdToken } from "firebase-admin/auth"

/**
 * Middleware to validate Firebase ID token.
 *
 * @param {Request} req - The express request object.
 * @param {Response} res - The express response object.
 * @param {NextFunction} next - The express next function.
 */
async function validateFirebaseIdToken(
  req: Request & { user?: DecodedIdToken },
  res: Response,
  next: NextFunction
) {
  // Check if request is authorized with Firebase ID token

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>",
      "or by passing a '__session' cookie."
    )
    res.status(403).send("Unauthorized")
    return
  }

  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1]
  } else if (req.cookies) {
    // 'Found "__session" cookie'
    // Read the ID Token from cookie.
    idToken = req.cookies.__session
  } else {
    // No cookie
    res.status(403).send("Unauthorized")
    return
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken)
    req.user = decodedIdToken
    next()
    return
  } catch (error) {
    console.error("Error while verifying Firebase ID token:", error)
    res.status(403).send("Unauthorized")
    return
  }
}

export default validateFirebaseIdToken
