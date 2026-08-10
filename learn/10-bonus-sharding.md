# 10 — Bonus: sharding

## Goal

Understand how to split a suite across shards locally and in CI. This lab is instructional; wiring sharding into every workflow is optional.

## Read first

- [Sharding](https://playwright.dev/docs/test-sharding)
- [Parallelism](https://playwright.dev/docs/test-parallel)

## Local shards

```bash
npx playwright test --shard=1/4 --project=chromium
npx playwright test --shard=2/4 --project=chromium
```

Run different shards in different terminals for wall-clock speedup.

**Note:** This repo sets `workers: 1` because the mock API list store is process-global and tests reset it between cases. Sharding across **machines/jobs** still helps CI; raising in-process workers needs fixture-owned data first (see [Testing guide](../docs/TESTING.md)).

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

Upload each shard’s report/blob as an artifact; merge blob reports if you use the blob reporter (this config already enables `blob` on CI).

## Check-in

- [] You can run `--shard=N/M` locally
- [] You know sharding ≠ raising `workers` without isolation
- [] You can sketch a matrix job for CI

Back to the [learn home](./index.md) competency checklist.
