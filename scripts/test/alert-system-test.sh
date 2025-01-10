#!/bin/bash

# Kleuren voor output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting Alert System Test Suite${NC}"

# Test 1: High Latency Alert
test_high_latency() {
    echo -e "\n${YELLOW}Testing High Latency Alert${NC}"
    
    # Simuleer hoge latency door een sleep in te voeren
    kubectl exec -n seo-tool deployment/backend -- bash -c "echo 'sleep(2)' >> /app/api/endpoint.py"
    
    # Genereer load
    hey -n 1000 -c 100 https://api.seo-tool.com/test
    
    # Check of alert is gegenereerd
    sleep 30
    ALERT=$(curl -s http://localhost:9090/api/v1/alerts | grep HighRequestLatency)
    
    if [ ! -z "$ALERT" ]; then
        echo -e "${GREEN}✓ High Latency Alert detected${NC}"
    else
        echo -e "${RED}✗ High Latency Alert not detected${NC}"
    fi
    
    # Cleanup
    kubectl exec -n seo-tool deployment/backend -- bash -c "sed -i '/sleep/d' /app/api/endpoint.py"
}

# Test 2: Error Rate Alert
test_error_rate() {
    echo -e "\n${YELLOW}Testing Error Rate Alert${NC}"
    
    # Injecteer errors
    kubectl exec -n seo-tool deployment/backend -- bash -c "echo 'raise Exception(\"Test error\")' >> /app/api/endpoint.py"
    
    # Genereer requests
    hey -n 1000 -c 100 https://api.seo-tool.com/test
    
    # Check alert
    sleep 30
    ALERT=$(curl -s http://localhost:9090/api/v1/alerts | grep HighErrorRate)
    
    if [ ! -z "$ALERT" ]; then
        echo -e "${GREEN}✓ Error Rate Alert detected${NC}"
    else
        echo -e "${RED}✗ Error Rate Alert not detected${NC}"
    fi
    
    # Cleanup
    kubectl exec -n seo-tool deployment/backend -- bash -c "sed -i '/raise Exception/d' /app/api/endpoint.py"
}

# Test 3: Resource Usage Alert
test_resource_usage() {
    echo -e "\n${YELLOW}Testing Resource Usage Alert${NC}"
    
    # Genereer CPU load
    kubectl exec -n seo-tool deployment/backend -- bash -c "yes > /dev/null &"
    
    # Wacht op resource spike
    sleep 30
    
    # Check alert
    ALERT=$(curl -s http://localhost:9090/api/v1/alerts | grep HighCPUUsage)
    
    if [ ! -z "$ALERT" ]; then
        echo -e "${GREEN}✓ Resource Usage Alert detected${NC}"
    else
        echo -e "${RED}✗ Resource Usage Alert not detected${NC}"
    fi
    
    # Cleanup
    kubectl exec -n seo-tool deployment/backend -- bash -c "pkill yes"
}

# Test 4: Service Health Alert
test_service_health() {
    echo -e "\n${YELLOW}Testing Service Health Alert${NC}"
    
    # Stop service
    kubectl scale deployment backend -n seo-tool --replicas=0
    
    # Wacht op service down
    sleep 30
    
    # Check alert
    ALERT=$(curl -s http://localhost:9090/api/v1/alerts | grep ServiceDown)
    
    if [ ! -z "$ALERT" ]; then
        echo -e "${GREEN}✓ Service Health Alert detected${NC}"
    else
        echo -e "${RED}✗ Service Health Alert not detected${NC}"
    fi
    
    # Cleanup
    kubectl scale deployment backend -n seo-tool --replicas=1
}

# Test 5: API Success Rate Alert
test_api_success_rate() {
    echo -e "\n${YELLOW}Testing API Success Rate Alert${NC}"
    
    # Injecteer failures
    kubectl exec -n seo-tool deployment/backend -- bash -c "echo 'return Response(status=500)' >> /app/api/endpoint.py"
    
    # Genereer requests
    hey -n 1000 -c 100 https://api.seo-tool.com/test
    
    # Check alert
    sleep 30
    ALERT=$(curl -s http://localhost:9090/api/v1/alerts | grep LowAPISuccessRate)
    
    if [ ! -z "$ALERT" ]; then
        echo -e "${GREEN}✓ API Success Rate Alert detected${NC}"
    else
        echo -e "${RED}✗ API Success Rate Alert not detected${NC}"
    fi
    
    # Cleanup
    kubectl exec -n seo-tool deployment/backend -- bash -c "sed -i '/Response(status=500)/d' /app/api/endpoint.py"
}

# Test 6: Notification Delivery
test_notifications() {
    echo -e "\n${YELLOW}Testing Notification Delivery${NC}"
    
    # Test Slack notification
    SLACK_NOTIFICATION=$(curl -s http://localhost:9093/api/v1/alerts | grep "channel='#monitoring'")
    if [ ! -z "$SLACK_NOTIFICATION" ]; then
        echo -e "${GREEN}✓ Slack notification sent${NC}"
    else
        echo -e "${RED}✗ Slack notification not sent${NC}"
    fi
    
    # Test Email notification
    EMAIL_NOTIFICATION=$(curl -s http://localhost:9093/api/v1/alerts | grep "to='team@company.com'")
    if [ ! -z "$EMAIL_NOTIFICATION" ]; then
        echo -e "${GREEN}✓ Email notification sent${NC}"
    else
        echo -e "${RED}✗ Email notification not sent${NC}"
    fi
}

# Test 7: Alert Recovery
test_alert_recovery() {
    echo -e "\n${YELLOW}Testing Alert Recovery${NC}"
    
    # Generate alert
    kubectl scale deployment backend -n seo-tool --replicas=0
    sleep 30
    
    # Recover service
    kubectl scale deployment backend -n seo-tool --replicas=1
    sleep 30
    
    # Check alert resolution
    RESOLVED=$(curl -s http://localhost:9090/api/v1/alerts | grep "state='resolved'")
    if [ ! -z "$RESOLVED" ]; then
        echo -e "${GREEN}✓ Alert properly resolved${NC}"
    else
        echo -e "${RED}✗ Alert not resolved${NC}"
    fi
}

# Run all tests
run_all_tests() {
    echo -e "${YELLOW}Starting Alert System Test Suite${NC}"
    
    test_high_latency
    test_error_rate
    test_resource_usage
    test_service_health
    test_api_success_rate
    test_notifications
    test_alert_recovery
    
    echo -e "\n${YELLOW}Test Suite Completed${NC}"
}

# Main execution
if [ "$1" = "--all" ]; then
    run_all_tests
else
    case "$1" in
        "latency") test_high_latency ;;
        "errors") test_error_rate ;;
        "resources") test_resource_usage ;;
        "health") test_service_health ;;
        "api") test_api_success_rate ;;
        "notifications") test_notifications ;;
        "recovery") test_alert_recovery ;;
        *) echo "Usage: $0 [--all|latency|errors|resources|health|api|notifications|recovery]" ;;
    esac
fi
