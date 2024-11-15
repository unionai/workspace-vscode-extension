export const trustedDomainsContents = `
[
  "*.union.ai",
  "*.flyte.org",
  "*.slack.com"
]
`;

export const createWfFileFileName = 'my_workflow.py';
export const createWfFileContents = `"""Create your own Union workflows 🔀

Fill in the blank \`@task\` functions below, modify them, or
create entirely new tasks/workflows!

When you're ready, run it on the terminal using \`union run my_workflow.py wf\`
along with any additional arguments you need to pass into the workflow.
"""

import flytekit as fl
import pandas as pd
from sklearn.linear_model import LogisticRegression


image = fl.ImageSpec(
    name="union-workspace",
    packages=["pandas", "pyarrow", "scikit-learn"],
)


@fl.task(container_image=image)
def get_data() -> pd.DataFrame:
    ...


@fl.task(container_image=image)
def process_data(data: pd.DataFrame) -> pd.DataFrame:
    ...


@fl.task(container_image=image)
def train_model(data: pd.DataFrame) -> LogisticRegression:
    ...


@fl.workflow
def wf() -> LogisticRegression:
    data = get_data()
    processed_data = process_data(data)
    return train_model(processed_data)
`;
