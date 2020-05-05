import { Router, Request, Response } from "express";
import { NextFunction } from "connect";
import * as AWS from "../../../../aws";
import * as jwt from "jsonwebtoken";
import * as c from "../../../../config/config";

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  //   return next();
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: "No authorization headers." });
  }
  console.log("req.headers.authorization", req.headers.authorization);
  
  const token_bearer = req.headers.authorization.split(" ");
  if (token_bearer.length != 2) {
    return res.status(401).send({ message: "Malformed token." });
  }

  const token = token_bearer[1];
  return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate." });
    }
    return next();
  });
}

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const sender = req.body.sender;

  if (!sender) {
    return res.status(400).send({ message: "Sender is required" });
  }

  console.log("sender from req body", sender);

  try {
    const IdentityList = await AWS.getAllSESIdentities();
    console.log("list", IdentityList);
    const promiseArray = IdentityList.Identities.map((identity) =>
      AWS.sendEmailUsingSES(sender, identity)
    );
    Promise.all(promiseArray)
      .then((data: any) => res.status(201).send(data))
      .catch((error: AWS.AWSError) =>
        res
          .status(500)
          .send({ message: `Failed to send email due to: ${error}` })
      );
  } catch (e) {
    return res
      .status(500)
      .send({ message: `Failed to send email due to: ${e}` });
  }
});

router.post("/verify", requireAuth, async (req: Request, res: Response) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    const aws_resp = AWS.verifyEmailForSES(email);
    aws_resp.then((data: any) => res.status(201).send(data));
    aws_resp.catch((error: AWS.AWSError) =>
      res
        .status(500)
        .send({ message: `Failed to verify email due to: ${error}` })
    );
  } catch (e) {
    return res
      .status(500)
      .send({ message: `Failed to send email due to: ${e}` });
  }
});

export const EmailRouter: Router = router;
