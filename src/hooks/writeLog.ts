import { useCallback } from "react";
import { Toast, showToast } from "@raycast/api";
import fs from "fs";

export default function useWriteLog() {
  const options = { flag: "a" };
  return useCallback((filePath: string, text: string) => {
    fs.writeFile(filePath, text, options, (err) => {
      if (err) {
        console.error(err);
        throw showToast({ title: "エラー", message: "書き込みに失敗しました。", style: Toast.Style.Failure });
      }
      showToast({ title: "成功", message: "正常に書き込みが完了しました。", style: Toast.Style.Success });
    });
  }, []);
}
