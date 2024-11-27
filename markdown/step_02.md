<br>
<br>
<br>

# 🔀 Parallelize Model Training

Union allows you to horizontally scale your workflows with `map_task`s. To
make this more concrete, we can define the hyperparameters of the model training
step as a dataclass and refactor the `train_model` task from the previous step:

 ```python
from dataclasses import dataclass asdict

@dataclass
class Hyperparameters:
    max_iter: int
    hidden_layer_sizes: list[int] = field(default_factory=lambda: [100])


@union.task(container_image=image)
def train_model(hyperparameters: Hyperparameters, data: pd.DataFrame) -> MLPClassifier:
    """Train a model on the wine dataset."""
    print("Training model")
    features = data.drop("target", axis="columns")
    target = data["target"]
    return MLPClassifier(**asdict(hyperparameters)).fit(features, target)
```

Then, we can use `map_task` to parallelize the training job, specifying
`concurrency=5` to limit the number of concurrent executions:

```python
@union.workflow
def training_workflow(hp_grid: list[Hyperparameters]) -> list[MLPClassifier]:
    """Put all of the steps together into a single workflow."""
    data = get_data()
    partial_train_model = partial(train_model, data=data)
    return union.map_task(partial_train_model, concurrency=5)(hp_grid)
```

Run this workflow by passing a list of hyperparameters to the workflow:

[▶️ Run locally in terminal](command:union-workspace.runParallelizeWorkflow)

```bash
union run --remote workflows/parallelize.py training_workflow --hp_grid '[{"max_iter": 500}, {"max_iter": 750}, {"max_iter": 1000}]'
```
