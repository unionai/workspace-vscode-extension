# Workspace VSCode Extension

This VSCode extension provides an onboarding experience for
Union Workspaces.

## Development Process

### Debugging extension:

Open the extension at root level in vscode:

```
cd flyte-demo
```

Run the extension by pressing `F5` or by going to the debug side menu. From here you can put breakpoints wherever you want
<img src="./media/startvscode.png">

### Generating binaries:

Install vsce (one time):
```
npm install -g vsce
```

Generate vsix binary:
```
vsce package --no-yarn
```

### Generating a new release

Go to releases in github and go through the release process as details in this [doc](https://unionai.atlassian.net/wiki/spaces/FLYTE/pages/50397263/VSCode+sandbox+extensions#Building-and-generating-a-release)
