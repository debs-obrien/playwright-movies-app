# 10 Bonus: sharding

## Goal

Understand how to split a suite across shards locally and in CI. Wiring sharding into every workflow is optional.

## Read first

- [Sharding](https://playwright.dev/docs/test-sharding)
- [Parallelism](https://playwright.dev/docs/test-parallel)

## Local shards

```bash
npx playwright test --shard=1/4 --project=chromium
npx playwright test --shard=2/4 --project=chromium
```

Run different shards in different terminals for wall-clock speedup.

This repo sets `workers: 1` because the mock API list store is process-global. Sharding across **machines or jobs** still helps CI. Raising in-process workers needs fixture-owned data first (see [Testing guide](/docs/TESTING)).

## CI sketch (GitHub Actions)

```yaml
strategy:
  fail-fast: false
  matrix:
    shardIndex: [1, 2, 3, 4]
    shardTotal: [4]
steps:
  - run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
```

Upload each shard's report or blob as an artifact. Merge blob reports if you use the blob reporter (enabled on CI in this repo).

## Done when

```bash
npx playwright test --shard=1/4 --project=chromium
npx playwright test --shard=2/4 --project=chromium
```

both complete on a clone, and you can explain why this repo keeps `workers: 1`.

## Key takeaways

- You can run `--shard=N/M` locally.
- Sharding is not the same as raising `workers` without isolation.
- You can sketch a matrix job for CI.

Back to the [course home](/course).
