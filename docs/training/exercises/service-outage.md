# Service Outage Training Scenario

## Scenario Setup

### Voorbereidingen
1. Deploy test services
2. Configure monitoring
3. Setup dependencies

### Tools Benodigd
- Kubernetes cluster
- Monitoring tools
- Communication channels

## Scenario Details

### Situatie
De SEO tool backend service is volledig onbereikbaar.

### Symptomen
1. Service unavailable
2. 500 errors
3. Connection timeouts
4. Dependency failures

### Initial Alert
```
[ALERT] ServiceDown
Severity: Critical
Service: backend-api
Status: Unreachable
Duration: 2m
```

## Training Stappen

### 1. Initial Assessment
```bash
# Check pod status
kubectl get pods -n seo-tool

# View recent events
kubectl get events -n seo-tool --sort-by='.lastTimestamp'

# Check logs
kubectl logs -n seo-tool -l app=backend-api --previous
```

### 2. Impact Analysis
```bash
# Check dependent services
kubectl get pods -n seo-tool -l tier=frontend
kubectl get pods -n seo-tool -l tier=worker

# Monitor error rates
curl -X GET https://api.seo-tool.com/metrics
```

### 3. Recovery Steps
```bash
# Restart service
kubectl rollout restart deployment backend-api -n seo-tool

# Scale if needed
kubectl scale deployment backend-api -n seo-tool --replicas=3

# Check health
curl -I https://api.seo-tool.com/health
```

### 4. Root Cause Analysis
1. Review deployment logs
2. Check configuration
3. Analyze metrics
4. Review changes

## Expected Actions

### 1. Immediate Response
- [ ] Check service status
- [ ] Assess impact
- [ ] Start incident log
- [ ] Notify team

### 2. Investigation
- [ ] Review logs
- [ ] Check dependencies
- [ ] Analyze metrics
- [ ] Identify cause

### 3. Communication
- [ ] Status updates
- [ ] Team coordination
- [ ] User notification
- [ ] Management brief

### 4. Recovery
- [ ] Implement fix
- [ ] Verify service
- [ ] Update status
- [ ] Document actions

## Evaluation Criteria

### Technical Skills
- Service recovery
- Log analysis
- Tool usage
- Problem solving

### Process Skills
- Response time
- Communication
- Coordination
- Documentation

### Documentation
- Incident record
- Status updates
- Recovery steps
- Post-mortem

## Learning Objectives

### Knowledge
- Service architecture
- Dependencies
- Recovery procedures
- Communication protocols

### Skills
- Troubleshooting
- Service recovery
- Team coordination
- Documentation

### Competencies
- Crisis management
- Decision making
- Communication
- Leadership

## Notes voor Trainer

### Setup
1. Prepare test environment
2. Configure monitoring
3. Setup communication
4. Define scenarios

### Common Issues
1. Configuration errors
2. Resource exhaustion
3. Dependency failures
4. Network problems

### Teaching Points
1. Service architecture
2. Recovery procedures
3. Communication importance
4. Documentation needs

## Scenario Variaties

### Variant 1: Configuration
- Invalid settings
- Secret issues
- Permission problems
- Environment vars

### Variant 2: Resources
- Memory limits
- CPU constraints
- Storage issues
- Network problems

### Variant 3: Dependencies
- Database down
- Cache failure
- API timeouts
- Network issues

## Follow-up

### Review
- Response effectiveness
- Recovery time
- Communication quality
- Documentation completeness

### Improvements
- Process updates
- Tool enhancements
- Training needs
- Documentation updates

### Action Items
1. Update procedures
2. Enhance monitoring
3. Improve automation
4. Document lessons
