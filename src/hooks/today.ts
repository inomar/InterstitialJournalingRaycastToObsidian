import { useCallback } from "react";

export default function useToday() {
  return useCallback(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  }, []);
}

export function useNowTime() {
  return useCallback(() => {
    const today = new Date();
    const hour = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    return `${hour}:${min}:${sec}`;
  }, []);
}
