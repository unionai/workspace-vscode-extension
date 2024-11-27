<br>
<br>
<br>

# 🤖 Train a Model

First, let's train a model using Union workflows. We'll import `union`,
`pandas`, and `scikit-learn` to get data and train our model.

```python
import union
import pandas as pd
from sklearn.neural_network import MLPClassifier
```

Then we define a container image with `ImageSpec`, which specifies the
dependencies for our workflow. You can think of this as a high-level interface
to define a container image:

```python
image = fl.ImageSpec(packages=["pandas", "pyarrow", "scikit-learn"])
```

Then, we define the `get_data` and `train_model` tasks and compose them
into a `training_workflow`:

```python
@union.task(container_image=image)
def get_data() -> pd.DataFrame:
    """Get the wine dataset."""
    from sklearn.datasets import load_wine

    print("Getting data")
    data = load_wine(as_frame=True).frame
    return data.assign(target=lambda x: x["target"].where(x["target"] == 0, 1))


@union.task(container_image=image)
def train_model(data: pd.DataFrame) -> MLPClassifier:
    """Train a model on the wine dataset."""
    print("Training model")
    features = data.drop("target", axis="columns")
    target = data["target"]
    return MLPClassifier().fit(features, target)


@union.workflow
def training_workflow() -> MLPClassifier:
    """Put all of the steps together into a single workflow."""
    data = get_data()
    return train_model(data)
```

Union supports seamless development from local to remote execution.
Run this workflow locally with the `union run` CLI command:

[▶️ Run locally in terminal](command:union-workspace.runTrainingLocal)

```bash
union run workflows/train.py training_workflow
```

Then, to run this on Union Serverless, simply supply the `--remote` flag:

[▶️ Run locally in terminal](command:union-workspace.runTrainingRemote)


```bash
union run --remote workflows/train.py training_workflow
```

After you run the workflow remotely, you can view the workflow in the Union UI
by clicking on the url that's printed in the terminal.