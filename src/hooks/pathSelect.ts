import { LocalStorage } from "@raycast/api";
import { useCallback } from "react";

const PATH = "PATH";

export function useSetFile() {
  return useCallback(async (path: string) => {
    await LocalStorage.setItem(PATH, path);
    return await LocalStorage.getItem<string>(PATH);
  }, []);
}

export function useGetFile() {
  return useCallback(async () => {
    return await LocalStorage.getItem<string>(PATH);
  }, []);
}
