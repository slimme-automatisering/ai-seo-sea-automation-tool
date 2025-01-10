# High Latency Alert Runbook

## Alert Details
- **Naam:** HighRequestLatency
- **Beschrijving:** Request latency is boven de 1 seconde
- **Severity:** Warning
- **Threshold:** > 1s gemiddelde response tijd over 5 minuten

## Impact
- Verminderde gebruikerservaring
- Mogelijke timeout errors
- Verhoogde server load
- Potentieel verlies van gebruikers

## Eerste Response Stappen

### 1. Initiële Diagnose
1. Check Grafana dashboard voor:
   - Request rate trends
   - CPU/Memory gebruik
   - Database performance metrics
   - Cache hit rates

2. Controleer logs voor:
   ```bash
   kubectl logs -n seo-tool -l app=backend --tail=100 | grep ERROR
   kubectl logs -n seo-tool -l app=frontend --tail=100 | grep ERROR
   ```

### 2. Snelle Mitigatie
1. **Als CPU/Memory hoog is:**
   ```bash
   # Scale up backend services
   kubectl scale deployment backend -n seo-tool --replicas=3
   ```

2. **Als database performance laag is:**
   - Check actieve queries:
   ```sql
   SELECT pid, now() - pg_stat_activity.query_start AS duration, query 
   FROM pg_stat_activity 
   WHERE state = 'active';
   ```
   - Identificeer en kill lange queries indien nodig

3. **Als cache hit rate laag is:**
   - Verify Redis status:
   ```bash
   redis-cli info | grep used_memory
   redis-cli info | grep hits
   ```
   - Clear cache indien nodig:
   ```bash
   redis-cli FLUSHDB
   ```

### 3. Root Cause Analysis
1. **Performance Profiling:**
   - Enable detailed tracing
   - Analyze slow queries
   - Check external service latencies

2. **Code Review:**
   - Recent deployments
   - Query optimizations
   - Cache strategie

3. **Infrastructure Review:**
   - Resource limits
   - Network latency
   - Load balancer configuratie

## Preventieve Maatregelen

### 1. Monitoring Verbeteringen
- Verfijn latency alerts
- Add detailed tracing
- Setup query performance monitoring

### 2. Infrastructure Updates
- Review resource allocations
- Optimize database indices
- Implement query caching

### 3. Code Optimalisatie
- Implement request batching
- Optimize database queries
- Review caching strategie

## Escalatie Procedure

### Level 1: Development Team
- **Wanneer:** Initial response binnen 30 minuten
- **Wie:** Backend developers
- **Actie:** Initial troubleshooting en quick fixes

### Level 2: DevOps Team
- **Wanneer:** Na 1 uur zonder resolution
- **Wie:** DevOps engineers
- **Actie:** Infrastructure en scaling issues

### Level 3: Database Team
- **Wanneer:** Database performance issues
- **Wie:** Database administrators
- **Actie:** Query optimalisatie en database scaling

## Communicatie Template

```
[High Latency Alert Update]
Status: [Investigating/Mitigating/Resolved]
Time Detected: [TIMESTAMP]
Duration: [DURATION]

Current Impact:
- Average Latency: [X]s
- Affected Services: [SERVICE_NAMES]
- User Impact: [DESCRIPTION]

Actions Taken:
1. [ACTION_1]
2. [ACTION_2]
3. [ACTION_3]

Next Steps:
1. [STEP_1]
2. [STEP_2]

ETA to Resolution: [TIME/Unknown]
```

## Post-Mortem Template

```
# High Latency Incident Post-Mortem

## Incident Details
- Date: [DATE]
- Duration: [DURATION]
- Impact: [IMPACT]

## Root Cause
[DESCRIPTION]

## Resolution
[STEPS_TAKEN]

## Lessons Learned
1. [LESSON_1]
2. [LESSON_2]

## Action Items
1. [ ] [ACTION_1]
2. [ ] [ACTION_2]
```
