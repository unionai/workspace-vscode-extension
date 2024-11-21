import * as vscode from 'vscode';
import { createWfFileContents, createWfFileFileName, trustedDomainsContents } from './constants';

const OPEN_FILE_OPTS: vscode.TextDocumentShowOptions = {
  preserveFocus: false,
  preview: false,
  viewColumn: vscode.ViewColumn.Two,
}

const getCurrentWorkingDirectory = () => {
  const workspaceFolders = vscode.workspace.workspaceFolders!;

  return workspaceFolders?.[0]?.uri?.path;
}

const findFile = async (searchPattern: string) => {
  const file = await vscode.workspace.findFiles(searchPattern);

  const targetFile = file?.[0];

  if (!targetFile) {
    vscode.window.showErrorMessage("Couldn't find files. Make sure you are in the correct demo repository.")
  }

  return targetFile;
}

export const initUnionWalkthrough = async () => {
  try {
    const trd = vscode.Uri.parse('trustedDomains:/Trusted Domains');
    await vscode.workspace.fs.stat(trd);
    await vscode.workspace.fs.writeFile(trd, Buffer.from(trustedDomainsContents, "utf8"));
  } catch (error) {
    console.log(error);
  }

  try {
    // Automatically open walkthrough on the first step
    vscode.commands.executeCommand('workbench.action.openWalkthrough', { "category": "unionai.union-workspace#union-workspace", "step": "unionai.union-workspace#union-workspace.start" });
    // await vscode.commands.executeCommand("walkthroughs.selectStep", `${"union-workspace.convertToUnion"}`)
  } catch (error) {
    console.log(error);
  }
}

const openFile = async (searchPattern: string) => {
  const targetFile = await findFile(searchPattern);
  await vscode.window.showTextDocument(targetFile, OPEN_FILE_OPTS);
}

const openNotebookDocument = async (searchPattern: string) => {
  const targetFile = await findFile(searchPattern);
  const nb = await vscode.workspace.openNotebookDocument(targetFile)
  await vscode.window.showNotebookDocument(nb, OPEN_FILE_OPTS);
}

export const OpenPythonWorkflow = async () => {
  return await openFile("**/python_workflow.py");
}

export const OpenPythonWorkflowIterate = async () => {
  return await openFile("**/iterating.py");
}

export const OpenPythonWorkflowParallelize = async () => {
  return await openFile("**/parallelism.py");
}

export const OpenUnionWorkflow = async () => {
  return await openFile("**/union_workflow.py");
}

export const OpenJupyterNotebook = async () => {
  return await openNotebookDocument("**/union_on_a_notebook.ipynb");
}

export const CreateNewWorkflow = async () => {
  const dirPath = getCurrentWorkingDirectory();
  let pyFile = vscode.Uri.joinPath(vscode.Uri.file(dirPath), createWfFileFileName);

  try {
    await vscode.workspace.fs.stat(pyFile);
  } catch (exception: any) {
    if (exception.code === 'FileNotFound') {
      await vscode.workspace.fs.writeFile(pyFile, Buffer.from(createWfFileContents, "utf8"));
    } else {
      throw exception;
    }
  }

  return vscode.window.showTextDocument(pyFile, OPEN_FILE_OPTS);
}

export interface OpenTerminalProps {
  command?: string,
}

export function noop() { }
export const openExternalurl = async () => {
  vscode.window.showInformationMessage("Union workspace terminated. You will be redirected back to Union Serverless.")
  return vscode.env.openExternal(vscode.Uri.parse('https://serverless.union.ai')).then(noop, noop);
}

export const openTerminal = async (props: OpenTerminalProps) => {
  const name = "Union";
  let terminal: vscode.Terminal | undefined = vscode.window.terminals.find((value) => value.name === name);
  if (!terminal) {
    const dirPath = getCurrentWorkingDirectory();
    terminal = vscode.window.createTerminal({
      name: name,
      cwd: dirPath,
    });
  }
  const command = props?.command || "";
  terminal.show(false);
  terminal.sendText(command, false)
}
