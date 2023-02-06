# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

There were a couple of factors that introduced uncessary complexity to the function `deterministicPartitionKey`. First, code duplication when generating sha3-512 hashes. This can be avoided by creating a reusable function within the module. By doing this I improved the redability of the function, also without duplicated code the code is more maintanable, and less prone to bugs. Second, the flow of execution was not optimized for redability. There were a few execution branches being interconnected which increased the complexity and maintanability of the function. This was avoided by introducing early returns for the simple cases such as when an event is not passed and when event does not contain a partition key field. Third, the data sanity checks are only necessary when using the event's partition key field. The previous version added sanity checks in execution paths were they were not necessary.
