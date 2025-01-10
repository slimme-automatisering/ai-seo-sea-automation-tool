# Service Health Alert Runbook

## Alert Details
- **Naam:** ServiceDown
- **Beschrijving:** Service is niet bereikbaar
- **Severity:** Critical
- **Threshold:** Service unreachable voor >1 minuut

## Impact
- Service onbeschikbaar voor gebruikers
- Data processing onderbroken
- Mogelijke data loss
- Business continuity affected

## Eerste Response Stappen

### 1. Initiële Diagnose
1. Check service status:
   ```bash
   # Check pod status
   kubectl get pods -n seo-tool -l app=backend
   
   # Check service endpoints
   kubectl get endpoints -n seo-tool
   
   # Check events
   kubectl get events -n seo-tool --sort-by='.lastTimestamp'
   ```

2. Check logs:
   ```bash
   # Recent logs
   kubectl logs -n seo-tool -l app=backend --tail=200
   
   # Previous container logs if crashed
   kubectl logs -n seo-tool [pod-name] --previous
   ```

3. Check dependencies:
   - Database connectivity
   - External services
   - Network connectivity
   - Storage status

### 2. Snelle Mitigatie
1. **Bij pod crashes:**
   ```bash
   # Restart pods
   kubectl rollout restart deployment backend -n seo-tool
   
   # Check pod events
   kubectl describe pod [pod-name] -n seo-tool
   ```

2. **Bij network issues:**
   ```bash
   # Check service
   kubectl describe service backend -n seo-tool
   
   # Check network policies
   kubectl get networkpolicies -n seo-tool
   ```

3. **Bij resource issues:**
   ```bash
   # Check resource usage
   kubectl top pods -n seo-tool
   
   # Scale if needed
   kubectl scale deployment backend -n seo-tool --replicas=3
   ```

### 3. Root Cause Analysis
1. **System Analysis:**
   - Pod lifecycle events
   - Resource constraints
   - Network connectivity
   - Storage issues

2. **Application Analysis:**
   - Application logs
   - Error patterns
   - Configuration issues
   - Dependency status

3. **Infrastructure Review:**
   - Node health
   - Network policies
   - Load balancer status
   - Cluster health

## Preventieve Maatregelen

### 1. Monitoring Improvements
- Add readiness probes
- Implement liveness probes
- Setup dependency checks
- Monitor pod lifecycle

### 2. Infrastructure Updates
- Implement redundancy
- Review resource limits
- Update network policies
- Improve health checks

### 3. Application Updates
- Enhance error handling
- Implement circuit breakers
- Add retry logic
- Improve logging

## Escalatie Procedure

### Level 1: DevOps Team
- **Wanneer:** Immediate response required
- **Wie:** DevOps engineers
- **Actie:** Service restoration

### Level 2: Development Team
- **Wanneer:** Application issues identified
- **Wie:** Backend developers
- **Actie:** Code-level fixes

### Level 3: Infrastructure Team
- **Wanneer:** Infrastructure issues found
- **Wie:** Infrastructure engineers
- **Actie:** System-level fixes

## Communicatie Template

```
[Service Health Alert Update]
Status: [Down/Recovering/Restored]
Time Detected: [TIMESTAMP]
Duration: [DURATION]

Current Impact:
- Service: [SERVICE_NAME]
- Status: [STATUS]
- Affected Users: [COUNT/PERCENTAGE]
- Business Impact: [DESCRIPTION]

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
# Service Health Incident Post-Mortem

## Incident Details
- Date: [DATE]
- Duration: [DURATION]
- Service: [SERVICE]
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

## Service Recovery Procedures

### 1. Pod Recovery
```bash
# Check pod status
kubectl get pods -n seo-tool -l app=backend

# Describe pod for events
kubectl describe pod [pod-name] -n seo-tool

# Force pod recreation
kubectl delete pod [pod-name] -n seo-tool

# Watch pod startup
kubectl get pods -n seo-tool -w
```

### 2. Service Recovery
```bash
# Check service
kubectl get svc -n seo-tool

# Verify endpoints
kubectl get endpoints -n seo-tool

# Check service logs
kubectl logs -n seo-tool -l app=backend

# Port-forward for testing
kubectl port-forward svc/backend -n seo-tool 8080:80
```

### 3. Network Recovery
```bash
# Check network policies
kubectl get networkpolicies -n seo-tool

# Test network connectivity
kubectl exec -it [pod-name] -n seo-tool -- curl -v backend-service

# Check DNS resolution
kubectl exec -it [pod-name] -n seo-tool -- nslookup backend-service
```

## Health Check Implementation

### 1. Liveness Probe
```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3
```

### 2. Readiness Probe
```yaml
readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3
```

### 3. Startup Probe
```yaml
startupProbe:
  httpGet:
    path: /health/startup
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 30
```
