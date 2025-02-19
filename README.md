# Workspace VSCode Extension

This VSCode extension provides an onboarding experience for
Union Workspaces.

## Development Process

### Generating binaries:

Install vsce (one time):

```bash
npm install -g vsce
```

Generate vsix binary:

```bash
vsce package --no-yarn
```

This will create a `union-workspace-X.Y.Z.vsix` file in the root directory.


### Local Debugging

Install the extension on VSCode:

- Run `make update-content` to update the workflows in the `content` submodule.
- Press `cmd + shift + p` and selecting `Extensions: Install from VSIX...`
- Select the `union-workspace-X.Y.Z.vsix` file. This should automatically activate the walkthrough.
- Before running any commands, press `cmd + shift + p` and select `Python: Select Interpreter`.
- Choose `+ Create Virtual Environment...` and select either `venv` or `conda`. This new environment should be selected as the Python Interpreter.
- Open the terminal and run `pip install -r requirements.txt`.
- Make sure that you `cd` into the `content` directory.
- You should now be ready to run the commands in the walkthrough.


### Generating a new release

- Add a `git tag -a vX.Y.Z -m 'Release X.Y.Z'` to the latest commit.
- Push the tag to the remote: `git push origin --follow-tags`.
- Go to the repo's new releases page: https://github.com/unionai/workspace-vscode-extension/releases/new.
- Create a new release with the same name as the tag `vX.Y.Z`.
- Attach the `union-workspace-X.Y.Z.vsix` file to the release.
