import * as vscode from 'vscode';
import { openExternalurl } from './callbacks';

let statusBar: vscode.StatusBarItem;
let timer: NodeJS.Timer;

export const startTimer = () => {
  const envTimestamp = process.env.SANDBOX_EXPIRED_TIMESTAMP;
  const endTime = envTimestamp ? new Date(+envTimestamp) : addMinutes(4 * 60 + 15);
  if (!statusBar) {
    statusBar = vscode.window.createStatusBarItem("union", vscode.StatusBarAlignment.Right, 0);
    statusBar.name = "union";
    statusBar.show();
  }

  const refreshTimer = async () => {
    const diffInMills = substractTiemstamps(endTime);
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

    return `Flyte trial expires in: ${hours}:${minutes}:${seconds}h`;
  }

  return `Flyte trial expired`;
}

const substractTiemstamps = (endTime: Date) => {
  const now = new Date();
  const diffTime = endTime.getTime() - now.getTime();

  return diffTime;
}
