# Resource Usage Alert Runbook

## Alert Details
- **Naam:** HighCPUUsage / HighMemoryUsage
- **Beschrijving:** CPU/Memory gebruik boven threshold
- **Severity:** Warning (>80%) / Critical (>90%)
- **Thresholds:** 
  - CPU: >80% over 5 minuten
  - Memory: >1GB of >80% van limit

## Impact
- Verminderde system performance
- Mogelijke service interruptions
- Verhoogde response times
- Potentiële system crashes

## Eerste Response Stappen

### 1. Initiële Diagnose
1. Check system metrics:
   ```bash
   # CPU Usage per pod
   kubectl top pods -n seo-tool
   
   # Node resource usage
   kubectl top nodes
   
   # Detailed pod metrics
   kubectl describe pod -n seo-tool -l app=backend
   ```

2. Check Grafana dashboards voor:
   - Resource usage trends
   - Application metrics
   - Request patterns
   - Background job status

### 2. Snelle Mitigatie
1. **Bij hoog CPU gebruik:**
   ```bash
   # Scale horizontaal
   kubectl scale deployment backend -n seo-tool --replicas=3
   
   # Check resource requests/limits
   kubectl describe pod -n seo-tool -l app=backend | grep -A 3 Resources
   ```

2. **Bij hoog memory gebruik:**
   ```bash
   # Identificeer memory leaks
   kubectl exec -n seo-tool [pod-name] -- jmap -heap
   
   # Force garbage collection
   kubectl exec -n seo-tool [pod-name] -- jcmd 1 GC.run
   ```

3. **Bij resource contention:**
   - Review pod affinities
   - Check node allocation
   - Adjust resource quotas

### 3. Root Cause Analysis
1. **Resource Usage Patterns:**
   - Analyze historical usage
   - Identify usage spikes
   - Check correlation with events

2. **Application Analysis:**
   - Review memory leaks
   - Check connection pools
   - Analyze cache usage
   - Review background jobs

3. **Infrastructure Review:**
   - Node capacity
   - Resource allocation
   - Scaling policies
   - Pod distribution

## Preventieve Maatregelen

### 1. Monitoring Improvements
- Set up predictive alerts
- Implement resource forecasting
- Add detailed memory profiling
- Monitor garbage collection

### 2. Application Updates
- Optimize resource usage
- Implement caching
- Review data structures
- Optimize background jobs

### 3. Infrastructure Changes
- Review resource limits
- Implement auto-scaling
- Optimize pod distribution
- Update node capacity

## Escalatie Procedure

### Level 1: DevOps Team
- **Wanneer:** Initial response binnen 30 minuten
- **Wie:** DevOps engineers
- **Actie:** Resource management en scaling

### Level 2: Development Team
- **Wanneer:** Application-specific issues
- **Wie:** Backend developers
- **Actie:** Code optimization en memory management

### Level 3: Infrastructure Team
- **Wanneer:** System-wide issues
- **Wie:** Infrastructure engineers
- **Actie:** Capacity planning en infrastructure updates

## Communicatie Template

```
[Resource Usage Alert Update]
Status: [Investigating/Mitigating/Resolved]
Time Detected: [TIMESTAMP]
Duration: [DURATION]

Current Impact:
- Resource: [CPU/Memory]
- Usage: [X]%
- Affected Services: [SERVICE_NAMES]
- Performance Impact: [DESCRIPTION]

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
# Resource Usage Incident Post-Mortem

## Incident Details
- Date: [DATE]
- Duration: [DURATION]
- Resource: [CPU/Memory]
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

## Resource Optimization Strategies

### CPU Optimization
1. **Code Level**
   - Optimize algorithms
   - Implement caching
   - Use async operations
   - Batch processing

2. **Infrastructure Level**
   - Horizontal scaling
   - Resource limits
   - Pod affinity
   - Node selection

3. **Monitoring**
   - CPU profiling
   - Hot spot detection
   - Usage patterns
   - Performance metrics

### Memory Optimization
1. **Application Level**
   - Memory leak detection
   - Garbage collection tuning
   - Connection pool sizing
   - Cache management

2. **Container Level**
   - Memory limits
   - JVM settings
   - Container sizing
   - Resource requests

3. **System Level**
   - Swap configuration
   - Node memory allocation
   - Pod distribution
   - Resource quotas

## Recovery Procedures

### 1. Immediate Recovery
```bash
# Scale services
kubectl scale deployment [deployment] -n seo-tool --replicas=[count]

# Pod restart
kubectl rollout restart deployment [deployment] -n seo-tool

# Force pod termination
kubectl delete pod [pod-name] -n seo-tool --force
```

### 2. Gradual Recovery
1. Monitor resource usage
2. Adjust limits gradually
3. Scale services incrementally
4. Verify system stability

### 3. Long-term Recovery
1. Implement resource optimization
2. Update monitoring
3. Review capacity planning
4. Update documentation
