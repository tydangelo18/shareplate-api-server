import { check, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const signUpValidator: ValidationChain[] = [
  check("first_name").notEmpty().withMessage("First name is required"),
  check("last_name").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
];

export const loginValidator: ValidationChain[] = [
  check("email").notEmpty().isEmail().withMessage("Invalid email format"),
  check("password").notEmpty().withMessage("Password is required"),
];

export const commentValidator: ValidationChain[] = [
  check("content")
    .notEmpty()
    .withMessage("Comment content is required"),
];

export const postValidator: ValidationChain[] = [
  check("post_picture").notEmpty().withMessage("Media is required for a post"),
];

// Middleware to check for validation errors
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
