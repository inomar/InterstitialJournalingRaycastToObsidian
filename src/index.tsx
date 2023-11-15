import { Form, ActionPanel, Action } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import useWriteLog from "./hooks/writeLog";
import useToday, { useNowTime } from "./hooks/today";
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
  const today = useToday();
  const now = useNowTime();
  const { isLoading, data } = usePromise(async () => {
    return await getFile();
  }, []);
  const defaultPath = useMemo(() => [data, "/", today(), ".md"].join(""), [data]);

  const saveFile = useCallback(
    async (dir: string[]) => {
      if (dir.length === 0) return;
      await setFile(dir[0]);
    },
    [setFile]
  );

  const handleSubmit = useCallback(
    (values: Values) => {
      if (!data) return;
      writeLog(data, `${values.textarea} <span style="color: #d1d5db;">- <i>${now()}</i></span>\n`);
    },
    [writeLog, data, now]
  );

  return (
    <>
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm onSubmit={handleSubmit} />
          </ActionPanel>
        }
      >
        {isLoading ? (
          <Form.Description text="Loading..." />
        ) : (
          <Form.FilePicker
            id="picker-file"
            title="ファイル"
            canChooseDirectories={false}
            canChooseFiles={true}
            storeValue={true}
            defaultValue={data ? [data] : [defaultPath]}
            onChange={saveFile}
            allowMultipleSelection={false}
          />
        )}

        <Form.TextArea
          id="textarea"
          title="📝"
          placeholder="ログに残したいこと、気づき、思ったことなど"
          storeValue={false}
        />
      </Form>
    </>
  );
}
