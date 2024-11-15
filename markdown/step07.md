# Parallelize your Workflows

Flyte also provides built-in constructs for parallelizing your tasks.

[📂 Open Python workflow](command:union-workspace.parallelizing)

In this example, we're extending our training workflow to implement a simple
gridsearch workflow leveraging the [`map_task`](https://docs.flyte.org/projects/cookbook/en/latest/auto/core/control_flow/map_task.html#) construct.

When using `map_task`s, the `@task` function being mapped over can take only
a single argument. To implement our gridsearch workflow, we update our workflow
as follows:

1. Use Python's `dataclasses` to define a custom dataclass called `TrainArgs`,
   which contains both the `hyperparameters` and `data` that's needed to train a
   model on a particular hyperparameter configuration.
2. Implement a task called `prepare_train_args`, which takes in a list of
   dictionaries containing the hyperparameters and the wine dataset itself,
   returning a list of `TrainArgs` (don't worry, Flyte represents `DataFrame`s
   and `StructuredDataset`s as pointers to the actual data, so we're not duplicating
   the data 🙃)
3. Update `training_workflow` so that it takes an `hp_grid: List[dict]` as input,
   then wraps the `train_model` task in `map_task(train_model, concurrency=5)`, feeding
   the output of `prepare_training_args` the newly created map task.

You can now run your gridsearch experiment with `union run`:

```
union run --remote workflows/parallelism.py training_workflow --hp_grid '[{"C": 0.1}, {"C": 0.01}, {"C": 0.001}]'
```
[▶️ Run remotely in terminal](command:union-workspace.openTerminalAndExecute?%7B%22command%22%3A%22union%20run%20--remote%20workflows%2Fparallelism.py%20training_workflow%20--hp_grid%20%27%5B%7B%5C%22C%5C%22%3A%200.1%7D%2C%20%7B%5C%22C%5C%22%3A%200.01%7D%2C%20%7B%5C%22C%5C%22%3A%200.001%7D%5D%27%22%7D)
