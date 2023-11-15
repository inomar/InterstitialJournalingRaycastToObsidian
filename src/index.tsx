import { Form, ActionPanel, Action, Detail } from "@raycast/api";
import fs from "fs";
import useWriteLog from "./hooks/writeLog";
import useToday, { useNowTime } from "./hooks/today";
import { useMemo } from "react";
import { DAILY_PATH } from "./assets/dailyPath";

type Values = {
  textarea: string;
};

// TODO 今日の日付のファイルがなければ作成する
export default function Command() {
  const writeLog = useWriteLog();
  const today = useToday();
  const now = useNowTime();
  const path = useMemo(() => [DAILY_PATH, today(), ".md"].join(""), []);

  function handleSubmit(values: Values) {
    writeLog(path, `${values.textarea} ${now()}\n`);
  }

  return (
    <>
      <Detail markdown={`Today is "${today()}"`} />
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm onSubmit={handleSubmit} />
          </ActionPanel>
        }
      >
        <Form.TextArea id="textarea" title="ひと言" placeholder="気づき、思ったことなど" />
      </Form>
    </>
  );
}
