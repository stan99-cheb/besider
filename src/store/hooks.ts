import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState, ThunkApiConfig } from "./store.types";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();