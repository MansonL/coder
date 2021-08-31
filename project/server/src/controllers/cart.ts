import cartModel from "../models/cart";
import { Request, Response } from "express";
const {
  getOne,
  getAll,
  add,
  delete
} = cartModel;