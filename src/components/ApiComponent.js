import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAssing } from "../features/assignSlice";
import { fetchAssigns } from "../features/AssignStoreSlice";
import { fetchCatagory } from "../features/catagorySlice";
import { fetchEmployee } from "../features/emplyeeSlice";
import { fetchItem } from "../features/itemSlice";
import { fetchpaybill } from "../features/paybillSlice";
import { fetchPayment } from "../features/paymentSlice";
import { fetchSpecific } from "../features/specificSlice";
import { fetchStore } from "../features/storeSlice";
import { fetchUni } from "../features/universitySlice";
import { fetchVender } from "../features/venderSlice";
import { fetchtags } from "../features/tagSlice";
function ApiComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSpecific());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchtags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCatagory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPayment());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchpaybill());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUni());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVender());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStore());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAssigns());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAssing());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  return <></>;
}

export default ApiComponent;
