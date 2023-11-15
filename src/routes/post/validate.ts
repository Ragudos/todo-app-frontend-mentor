import { type NextFunction, type Request, type Response } from "express";
import {
    incrementAmountOfFailedRequests,
    resetAmountOfFailedRequests,
} from "@/lib/limiter";
import { isBadWord } from "@/lib/bad-word";

export function validation(req: Request, res: Response, next: NextFunction) {
    const todo = req.body.todo;

    if (!todo || todo.length < 5) {
        res.status(422).send("Todo must be greater than 5 characters");

        incrementAmountOfFailedRequests();

        return;
    }

    if (isBadWord(todo)) {
        res.status(400).send("Profanity is not allowed.");

        incrementAmountOfFailedRequests();

        return;
    }

    resetAmountOfFailedRequests();
    next();
}
