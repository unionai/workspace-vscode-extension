export const trustedDomainsContents = `
[
  "*.union.ai",
  "*.flyte.org",
  "*.slack.com"
]
`;

export const createWfFileFileName = 'my_workflow.py';
export const createWfFileContents = `"""Create your own Flyte workflows 🔀

Fill in the blank \`@task\` functions below, modify them, or
create entirely new tasks/workflows!

When you're ready, run it on the terminal using \`pyflyte run my_workflow.py wf\`
along with any additional arguments you need to pass into the workflow.
"""

import pandas as pd

from flytekit import task, workflow
from flytekit.types.pickle import FlytePickle

@task
def get_data() -> pd.DataFrame:
    ...


@task
def process_data(data: pd.DataFrame) -> pd.DataFrame:
    ...


@task
def train_model(data: pd.DataFrame) -> FlytePickle:
    ...


@workflow
def wf() -> FlytePickle:
    data = process_data(data=get_data())
    return train_model(data=data)
`;
