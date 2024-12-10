import * as vscode from 'vscode';
import {
  OpenPythonWorkflow,
  OpenJupyterNotebook,
  openTerminal as OpenTerminal,
  OpenUnionWorkflow,
  OpenPythonWorkflowIterate,
  OpenPythonWorkflowParallelize,
  CreateNewWorkflow,
  initUnionWalkthrough,
  RunTrainingWorkflowLocal,
  RunTrainingWorkflowRemote,
  RunParallelizeWorkflow,
  RunLogin,
} from './callbacks';

import { disposeStatusBar, startTimer } from './timer';

export const enum Commands {
  "Start" = 'union-workspace.start',
  "OpenPyWorkflow" = 'union-workspace.openPyWorkflow',
  "OpenUnionWorkflow" = 'union-workspace.openUnionWorkflow',
  "NewJupyter" = 'union-workspace.openJupyter',
  "OpenTerminal" = 'union-workspace.openTerminalAndExecute',
  "ExecuteLocally" = 'union-workspace.executeWorkflowLocally',
  "ExecuteRemote" = 'union-workspace.executeWorkflowRemote',
  "InspectResults" = 'union-workspace.inspectResults',
  "Parallelize" = 'union-workspace.parallelizing',
  "Iterate" = 'union-workspace.iterating',
  "CreateNewWorkflow" = 'union-workspace.createNewWorkflow',
  "RunLogin" = 'union-workspace.runLogin',
  "RunTrainingLocal" = 'union-workspace.runTrainingLocal',
  "RunTrainingRemote" = 'union-workspace.runTrainingRemote',
  "RunParallelize" = 'union-workspace.runParallelizeWorkflow',
}

export function activate(context: vscode.ExtensionContext) {
  initUnionWalkthrough();

  // Register Commands
  context.subscriptions.push(vscode.commands.registerCommand(Commands.Iterate, OpenPythonWorkflowIterate));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.OpenPyWorkflow, OpenPythonWorkflow));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.OpenUnionWorkflow, OpenUnionWorkflow));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.NewJupyter, OpenJupyterNotebook));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.OpenTerminal, OpenTerminal));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.Parallelize, OpenPythonWorkflowParallelize));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.RunLogin, RunLogin));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.RunTrainingLocal, RunTrainingWorkflowLocal));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.RunTrainingRemote, RunTrainingWorkflowRemote));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.RunParallelize, RunParallelizeWorkflow));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.CreateNewWorkflow, CreateNewWorkflow));
  // remove timer since this doesn't reset the timer when user performs an new action
  // context.subscriptions.push(startTimer());
  return context;
}

// This method is called when your extension is deactivated
export function deactivate() {
  disposeStatusBar();
}
