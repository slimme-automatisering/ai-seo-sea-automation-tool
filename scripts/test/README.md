# Alert System Test Suite

## Overzicht
Deze test suite valideert de functionaliteit van het complete alert systeem, inclusief:
- Alert detectie
- Notificatie delivery
- Alert recovery
- Response procedures

## Vereisten
- Kubernetes cluster
- Prometheus & AlertManager
- Hey (HTTP load generator)
- curl

## Test Scenarios

### 1. High Latency Test
Test de detectie van verhoogde response times
```bash
./alert-system-test.sh latency
```

### 2. Error Rate Test
Test de detectie van verhoogde error rates
```bash
./alert-system-test.sh errors
```

### 3. Resource Usage Test
Test de detectie van hoog resource gebruik
```bash
./alert-system-test.sh resources
```

### 4. Service Health Test
Test de detectie van service outages
```bash
./alert-system-test.sh health
```

### 5. API Success Rate Test
Test de detectie van lage API success rates
```bash
./alert-system-test.sh api
```

### 6. Notification Test
Test de delivery van notificaties
```bash
./alert-system-test.sh notifications
```

### 7. Recovery Test
Test het herstel van alerts
```bash
./alert-system-test.sh recovery
```

### Alle Tests
Run alle test scenarios
```bash
./alert-system-test.sh --all
```

## Test Resultaten
De test resultaten worden getoond met kleur-gecodeerde output:
- 🟢 Groen: Test geslaagd
- 🔴 Rood: Test gefaald
- 🟡 Geel: Test in uitvoering

## Cleanup
Na elke test worden automatisch alle test condities opgeruimd:
- Services worden hersteld
- Test data wordt verwijderd
- Resource gebruik wordt genormaliseerd

## Troubleshooting

### Common Issues
1. **Test faalt door timing**
   - Verhoog de sleep duration
   - Check netwerk latency

2. **Notificaties komen niet aan**
   - Verify Slack/Email configuratie
   - Check AlertManager logs

3. **Resource test faalt**
   - Check resource limits
   - Verify monitoring config

### Logs Bekijken
```bash
# AlertManager logs
kubectl logs -n monitoring alertmanager-main-0

# Prometheus logs
kubectl logs -n monitoring prometheus-k8s-0

# Backend logs
kubectl logs -n seo-tool -l app=backend
```

## Maintenance
- Update test scenarios regelmatig
- Pas thresholds aan indien nodig
- Review en update notificatie templates
- Houd documentatie actueel
