export const trustedDomainsContents = `
[
  "*.union.ai",
  "*.flyte.org",
  "*.slack.com",
  "signin-serverless.hosted.unionai.cloud",
  "*.unionai.cloud",
  "*.github.com",
]
`;

export const createWfFileFileName = 'my_workflow.py';
export const createWfFileContents = `"""Create your own Union workflows 🔀

Fill in the blank \`@union.task\` functions below, modify them, or
create entirely new tasks/workflows!

When you're ready, run it on the terminal using \`union run my_workflow.py wf\`
along with any additional arguments you need to pass into the workflow.
"""

import union
import pandas as pd
from sklearn.linear_model import LogisticRegression


image = fl.ImageSpec(packages=["pandas", "pyarrow", "scikit-learn"])


@union.task(container_image=image)
def get_data() -> pd.DataFrame:
    ...


@union.task(container_image=image)
def process_data(data: pd.DataFrame) -> pd.DataFrame:
    ...


@union.task(container_image=image)
def train_model(data: pd.DataFrame) -> LogisticRegression:
    ...


@union.workflow
def wf() -> LogisticRegression:
    data = get_data()
    processed_data = process_data(data)
    return train_model(processed_data)
`;
