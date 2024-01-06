"use client";
export const getDate = (stamp: string) => new Date(stamp).toDateString();
export const getTime = (stamp: string) => new Date(stamp).toLocaleTimeString();

export const adjustProductName = (name: string) => {
  if (name.length < 20) return name;
  return name.slice(0, 19);
};

interface StatusResponse {
  message?: string;
  path?: string;
}

interface SuccessResponse {
  message?: string;
  timeout?: number;
}

export const verifyStatus = (status: number): StatusResponse => {
  const obj: StatusResponse = {};
  if (status === 401 || status === 498 || status === 500) {
    obj.message = "Invalid Token";
    obj.path = "/auth";
  }

  if (status === 400) {
    obj.message = "Something went wrong!";
  }

  if (status === 403) {
    obj.message = "Access Denied";
    obj.path = "/";
  }

  return obj;
};

export const successToast = (
  operationType: string,
  prefix: string
): SuccessResponse => {
  let obj: SuccessResponse = {};
  if (operationType === "delete") {
    obj.message = `${prefix} deleted.`;
    obj.timeout = 1000;
  }
  if (operationType === "update") {
    obj.message = `${prefix} updated.`;
    obj.timeout = 1000;
  }
  if (operationType === "create") {
    obj.message = `${prefix} added.`;
    obj.timeout = 1000;
  }
  return obj;
};

export const removeFile = (id: number, files: any) => {
  const filtered = files.filter((file: any, index: number) => index !== id);
  return filtered;
};

export const getUserRole = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("role");
  }
};

export const getUserEmail = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("userEmail");
  }
};

export const headers = {
  headers: {
    userEmail: getUserEmail(),
  },
};

export const cartItemName = (name: string) => {
  if (name.length < 20) return name;
  return name.slice(0, 19);
};

export const isSingleItem = (qty: number) => {
  if (qty <= 1) return "Item";
  return "Items";
};
