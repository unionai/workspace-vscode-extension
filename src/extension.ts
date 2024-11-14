import * as vscode from 'vscode';
import { OpenPythonWorkflow, OpenJupyterNotebook, openTerminal as OpenTerminal, OpenFlyteWorkflow, OpenPythonWorkflowIterate, OpenPythonWorkflowParallelize, CreateNewWorkflow, initFlyteWalkthrough } from './callbacks';
import { disposeStatusBar, startTimer } from './timer';

export const enum Commands {
  "Start" = 'union-workspace.start',
  "OpenPyWorkflow" = 'union-workspace.openPyWorkflow',
  "OpenFlyteWorkflow" = 'union-workspace.openFlyteWorkflow',
  "NewJupyter" = 'union-workspace.openJupyter',
  "OpenTerminal" = 'union-workspace.openTerminalAndExecute',
  "ExecuteLocally" = 'union-workspace.executeWorkflowLocally',
  "ExecuteRemote" = 'union-workspace.executeWorkflowRemote',
  "InspectResults" = 'union-workspace.inspectResults',
  "Parallelize" = 'union-workspace.parallelizing',
  "Iterate" = 'union-workspace.iterating',
  "CreateNewWorkflow" = 'union-workspace.createNewWorkflow'
}

export function activate(context: vscode.ExtensionContext) {
  initFlyteWalkthrough();

  // Register Commands
  context.subscriptions.push(vscode.commands.registerCommand(Commands.Parallelize, OpenPythonWorkflowParallelize));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.Iterate, OpenPythonWorkflowIterate));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.OpenPyWorkflow, OpenPythonWorkflow));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.OpenFlyteWorkflow, OpenFlyteWorkflow));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.NewJupyter, OpenJupyterNotebook));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.OpenTerminal, OpenTerminal));
  context.subscriptions.push(vscode.commands.registerCommand(Commands.CreateNewWorkflow, CreateNewWorkflow));
  context.subscriptions.push(startTimer());
  return context;
}

// This method is called when your extension is deactivated
export function deactivate() {
  disposeStatusBar();
}
