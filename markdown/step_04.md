<br>
<br>
<br>

# 🤔 Learn More

🎉 Congratulations!

You've successfully run your first Union workflows:

- You trained a model locally and shipped it to Union Serverless with the
  `union run` CLI command.
- You parallelized the training of multiple models to do hyperparameter sweeps
  using `map_task`.
- You ran workflows locally and remotely directly in a Jupyter notebook.

## Next steps

Use this workspace environment to learn more about Union by checking out the
[User Guide](https://docs.union.ai/serverless/user-guide/) and end-to-end
[Tutorial](https://docs.union.ai/serverless/tutorials/) examples.

Clone the Union examples repository to explore and run them:

```
git clone https://github.com/unionai/unionai-examples
cd unionai-examples
```

This repository contains `user_guide` and `tutorials` subfolders that correspond
to the [User Guide](https://docs.union.ai/serverless/user-guide/) and
[Tutorial](https://docs.union.ai/serverless/tutorials/) documentation, respectively.

For instance, to run the `tutorials` examples, simply run the instructions in the **Run on Union BYOC** dropdown.
For example, to train a [credit default model with XGBoost](https://docs.union.ai/byoc/tutorials/finance/credit-default-xgboost),
run the following command:

```
union run --remote tutorials/credit_default/credit_default.py credit_default_wf
```
