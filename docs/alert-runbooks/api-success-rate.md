# API Success Rate Alert Runbook

## Alert Details
- **Naam:** LowAPISuccessRate
- **Beschrijving:** API success rate onder 95%
- **Severity:** Warning (<95%) / Critical (<90%)
- **Threshold:** Success rate <95% over 5 minuten

## Impact
- Verminderde service quality
- Gebruiker frustratie
- Data processing issues
- Business impact

## Eerste Response Stappen

### 1. Initiële Diagnose
1. Check API metrics:
   ```bash
   # Check recent logs voor errors
   kubectl logs -n seo-tool -l app=backend --tail=200 | grep -i error
   
   # Check API endpoints status
   curl -I https://api.seo-tool.com/health
   ```

2. Review Grafana dashboards:
   - Error distribution
   - Response times
   - Request patterns
   - Dependency health

### 2. Snelle Mitigatie
1. **Bij specifieke endpoint issues:**
   ```bash
   # Check endpoint metrics
   curl -X GET https://api.seo-tool.com/metrics
   
   # Review recent changes
   git log -p backend/src/controllers/
   ```

2. **Bij systeem issues:**
   ```bash
   # Check system resources
   kubectl top pods -n seo-tool
   
   # Scale if needed
   kubectl scale deployment backend -n seo-tool --replicas=3
   ```

3. **Bij dependency issues:**
   - Check external services
   - Verify database connections
   - Review cache status

### 3. Root Cause Analysis
1. **Error Pattern Analysis:**
   - Review error logs
   - Analyze request patterns
   - Check rate limiting
   - Verify authentication

2. **Performance Analysis:**
   - Response times
   - Resource usage
   - Database queries
   - Cache efficiency

3. **System Review:**
   - Recent deployments
   - Configuration changes
   - Infrastructure updates
   - Dependency versions

## Preventieve Maatregelen

### 1. Monitoring Improvements
- Enhanced error tracking
- Detailed request logging
- Dependency monitoring
- Performance profiling

### 2. System Updates
- Implement circuit breakers
- Add retry mechanisms
- Improve error handling
- Update rate limiting

### 3. Process Updates
- Review deployment process
- Update testing procedures
- Enhance monitoring
- Improve documentation

## Escalatie Procedure

### Level 1: API Team
- **Wanneer:** Initial response binnen 15 minuten
- **Wie:** API developers
- **Actie:** Endpoint fixes en quick wins

### Level 2: Backend Team
- **Wanneer:** System-wide issues
- **Wie:** Backend developers
- **Actie:** Service-level fixes

### Level 3: Infrastructure Team
- **Wanneer:** Infrastructure issues
- **Wie:** DevOps engineers
- **Actie:** System-level solutions

## Communicatie Template

```
[API Success Rate Alert Update]
Status: [Investigating/Mitigating/Resolved]
Time Detected: [TIMESTAMP]
Duration: [DURATION]

Current Impact:
- Success Rate: [X]%
- Affected Endpoints: [ENDPOINTS]
- Error Types: [TYPES]
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
# API Success Rate Incident Post-Mortem

## Incident Details
- Date: [DATE]
- Duration: [DURATION]
- Success Rate: [RATE]
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

## API Optimization Strategies

### 1. Error Handling
- Implement proper status codes
- Add detailed error messages
- Use error boundaries
- Log error context

### 2. Performance
- Optimize queries
- Implement caching
- Use connection pooling
- Add request queuing

### 3. Reliability
- Add circuit breakers
- Implement retries
- Use timeouts
- Add rate limiting

## Recovery Procedures

### 1. Immediate Recovery
```bash
# Restart services
kubectl rollout restart deployment backend -n seo-tool

# Clear caches
redis-cli FLUSHDB

# Reset rate limits
redis-cli DEL rate_limits
```

### 2. Gradual Recovery
1. Monitor success rates
2. Adjust rate limits
3. Update caching
4. Verify endpoints

### 3. Long-term Recovery
1. Review error patterns
2. Update monitoring
3. Improve documentation
4. Enhance testing

## API Testing Suite

### 1. Endpoint Tests
```bash
# Health check
curl -I https://api.seo-tool.com/health

# Basic functionality
curl -X GET https://api.seo-tool.com/api/v1/test

# Load test
ab -n 1000 -c 10 https://api.seo-tool.com/api/v1/test
```

### 2. Performance Tests
```bash
# Response time
curl -w "%{time_total}\n" -o /dev/null -s https://api.seo-tool.com/api/v1/test

# Concurrent requests
hey -n 1000 -c 100 https://api.seo-tool.com/api/v1/test
```

### 3. Dependency Tests
```bash
# Database connection
psql -h localhost -U postgres -c "SELECT 1"

# Redis connection
redis-cli PING

# External services
curl -I https://external-service.com/health
```
