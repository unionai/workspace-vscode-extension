import * as vscode from 'vscode';
import { openExternalurl } from './callbacks';

let statusBar: vscode.StatusBarItem;
let timer: NodeJS.Timer;

export const startTimer = () => {
  const envTimestamp = process.env.SANDBOX_EXPIRED_TIMESTAMP;
  let aliveDuration = 4 * 60 + 15;
  if (process.env.WORKSPACE_TTL_SECONDS) {
    aliveDuration = Math.floor(Number(process.env.WORKSPACE_TTL_SECONDS) / 60);
  }
  const endTime = envTimestamp ? new Date(+envTimestamp) : addMinutes(aliveDuration);

  if (!statusBar) {
    statusBar = vscode.window.createStatusBarItem("union", vscode.StatusBarAlignment.Right, 0);
    statusBar.name = "union";
    statusBar.show();
  }

  // note: this needs to read from the heartbeat path
  // $HOME/.local/share/code-server/heartbeat to refresh the timer
  const refreshTimer = async () => {

    const diffInMills = substractTimestamps(endTime);
    const diffText = formatTimeDiff(diffInMills);
    statusBar.text = diffText;

    if (diffInMills <= 0) {
      disposeStatusBar()
      await openExternalurl();
    }
  }

  timer = setInterval(refreshTimer, 1000);

  return statusBar;
}

export const disposeStatusBar = () => {
  if (statusBar) {
    statusBar.dispose();
  }

  clearInterval(timer);
}

const addMinutes = (minutes: number) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}

const formatTimeDiff = (diffInMills: number): string => {
  if (diffInMills > 0) {
    const seconds = Math.floor((diffInMills / 1000) % 60).toLocaleString(undefined, {
      minimumIntegerDigits: 2
    });
    const minutes = Math.floor((diffInMills / (1000 * 60)) % 60).toLocaleString(undefined, {
      minimumIntegerDigits: 2
    });
    const hours = Math.floor((diffInMills / (1000 * 60 * 60)) % 24);

    return `Union workspace will terminate in: ${hours}:${minutes}:${seconds}h`;
  }

  return `Union workspace expired`;
}

const substractTimestamps = (endTime: Date) => {
  const now = new Date();
  const diffTime = endTime.getTime() - now.getTime();

  return diffTime;
}
