import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import useWriteLog from "./hooks/writeLog";
import { useNowTime } from "./hooks/today";
import { useCallback, useMemo } from "react";
import { useGetFile, useSetFile } from "./hooks/pathSelect";

type Values = {
  textarea: string;
};

// TODO 今日の日付のファイルがなければ作成する
export default function Command() {
  const getFile = useGetFile();
  const setFile = useSetFile();
  const writeLog = useWriteLog();
  const now = useNowTime();
  const { isLoading, data, mutate } = usePromise(getFile, []);

  const saveFile = useCallback(
    (dir: string[]) => {
      if (dir.length === 0) return;
      setFile(dir[0]);
      mutate();
    },
    [setFile]
  );

  const handleSubmit = useCallback(
    (values: Values) => {
      if (!data) {
        showToast({ title: "エラー", message: "ファイルが選択されていません。", style: Toast.Style.Failure });
        return;
      }
      writeLog(data, `${values.textarea} <span style="color: #d1d5db;">- <i>${now()}</i></span>\n`);
    },
    [writeLog, data, now]
  );

  const filePath = useMemo(() => (data ? [data] : undefined), []);

  return (
    <>
      <Form
        isLoading={isLoading}
        actions={
          <ActionPanel>
            <Action.SubmitForm onSubmit={handleSubmit} />
          </ActionPanel>
        }
      >
        <Form.FilePicker
          id="picker-file"
          title="ファイル"
          canChooseDirectories={false}
          canChooseFiles={true}
          storeValue={true}
          value={filePath}
          onChange={saveFile}
          allowMultipleSelection={false}
        />

        <Form.TextArea
          id="textarea"
          title="ログ"
          placeholder="ログに残したいこと、気づき、思ったことなど"
          storeValue={false}
          autoFocus
        />
      </Form>
    </>
  );
}
