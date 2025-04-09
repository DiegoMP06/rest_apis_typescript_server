import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors: RequestHandler = (
    request,
    response,
    next
) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
        return;
    }

    next();
};
