import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize  from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/",getUsers);

userRouter.get("/:id",authorize,getUser);

userRouter.post("/", (req, res) => {
    res.send({ title: "Create new User" });
});

userRouter.put("/:id", (req, res) => {
    res.send({ title: "Update User" });
});

// Changed from .put to .delete for delete route
userRouter.delete("/:id", (req, res) => {
    res.send({ title: "Delete User" });
});

export default userRouter;
