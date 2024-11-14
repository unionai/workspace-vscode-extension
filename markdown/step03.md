# Executing Flyte Workflows

You can run the `training_workflow` locally with:

```
pyflyte run workflows/flyte_workflow.py training_workflow
```
[▶️ Run locally in terminal](command:flyte-demo.openTerminalAndExecute?%7B%22command%22%3A%20%22pyflyte%20run%20workflows%2Fflyte_workflow.py%20training_workflow%22%7D)

Although this may not catch all the errors you may encounter in production,
doing this helps during the development and debugging process.

Once you're happy with the state of your code, you can run your workflow
on a Flyte cluster with the `--remote` flag:

```
pyflyte run --remote workflows/flyte_workflow.py training_workflow
```
[▶️ Run remotely in terminal](command:flyte-demo.openTerminalAndExecute?%7B%22command%22%3A%20%22pyflyte%20run%20--remote%20workflows%2Fflyte_workflow.py%20training_workflow%22%7D)

**Expected output:** You should see a URL to the workflow execution on your demo Flyte cluster:

```
Go to https://serverless.union.ai/org/<org>/projects/<project>/domains/<domain>/executions/<execution_name> to see execution in the console.
```

Where *&lt;execution_name&gt;* is a unique identifier for the workflow execution.