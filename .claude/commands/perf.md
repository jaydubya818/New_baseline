# /perf — Performance Analysis

Profile and optimize $ARGUMENTS (function, endpoint, component, or database query).

## Analysis Process

### Step 1: Measure First (Never Guess)

**For API endpoints:**
```bash
# Quick load test
npx autocannon -c 100 -d 30 http://localhost:3000/api/[endpoint]

# Or with curl timing
curl -o /dev/null -s -w "Connect: %{time_connect}s\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" \
  http://localhost:3000/api/[endpoint]
```

**For database queries:**
```sql
EXPLAIN ANALYZE [your query here];
-- Look for: Seq Scan on large tables, high cost nodes, missing indexes
```

**For JavaScript/TypeScript:**
```javascript
console.time('operation');
// ... code to profile
console.timeEnd('operation');

// For more detail: use Node's --prof flag or clinic.js
```

### Step 2: Identify Bottlenecks

Look for these common patterns:

**N+1 Queries**
```javascript
// Bad: N+1
const users = await db.users.findMany();
for (const user of users) {
  user.posts = await db.posts.findMany({ where: { userId: user.id } });
}

// Good: Single query with join
const users = await db.users.findMany({ include: { posts: true } });
```

**Missing Indexes**
```sql
-- Find slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC LIMIT 20;

-- Add index for frequently queried columns
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

**Frontend Re-renders**
```javascript
// Use React DevTools Profiler or:
import { memo, useMemo, useCallback } from 'react';
// Wrap expensive computations
const result = useMemo(() => expensiveCalc(data), [data]);
```

**Bundle Size**
```bash
npx webpack-bundle-analyzer stats.json
# or
npx vite-bundle-visualizer
```

### Step 3: Apply Optimizations (with benchmarks)

For each optimization:
1. Measure the baseline
2. Apply the change
3. Measure again
4. Document the improvement: `[operation]: 450ms → 23ms (95% improvement)`

### Step 4: Report

```
## Performance Analysis: [scope]

### Baseline Measurements
| Operation | Before | Target | Priority |
|-----------|--------|--------|----------|
| [op] | Xms | Yms | High |

### Root Causes Found
1. [N+1 query on /api/users] — fetching 50 queries per request
2. [Missing index on orders.user_id] — sequential scan on 1M rows
3. [Unoptimized React renders in UserList] — re-rendering on every keystroke

### Optimizations Applied
1. ✅ [fix] → [before/after measurement]
2. ✅ [fix] → [before/after measurement]

### After Measurements
| Operation | After | Improvement |
|-----------|-------|-------------|
| [op] | Yms | X% faster |

### Remaining Opportunities
- [suggestion for future optimization]
```

## Usage
```
/perf /api/users endpoint
/perf UserList component
/perf the orders database query
/perf  (full application profiling)
```
