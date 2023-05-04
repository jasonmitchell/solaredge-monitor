# Solaredge Monitor
See [Solaredge Monitoring API documentation](https://knowledge-center.solaredge.com/sites/kc/files/se_monitoring_api.pdf)

## Getting Started
Create a `.env` file containing the following keys and populate with the appropriate values:
```
SSH_ADDR=<ssh remote address>
API_KEY=<solaredge monitoring api key>
SITE_ID=<solaredge site id>
```

Example:
```
SSH_ADDR=pi@raspberrypi.local
API_KEY=0123456789ABCDEFGHIJKLMNOPQRSTUV
SITE_ID=1234567
```

And deploy:
```shell
npm install
npm run deploy
```


### Accessing Metrics
Metrics are exposed for Prometheus:

```shell
 curl http://raspberrypi.local:9090/metrics
```

```
# HELP solar_last_day_energy Total solar energy generated in the last day
# TYPE solar_last_day_energy gauge
solar_last_day_energy{app="solaredge-monitor",hostname="raspberrypi"} 17220

# HELP solar_last_month_energy Total solar energy generated in the last month
# TYPE solar_last_month_energy gauge
solar_last_month_energy{app="solaredge-monitor",hostname="raspberrypi"} 54260

# HELP solar_last_year_energy Total solar energy generated in the last year
# TYPE solar_last_year_energy gauge
solar_last_year_energy{app="solaredge-monitor",hostname="raspberrypi"} 901029

# HELP solar_life_time_energy Total solar energy generated
# TYPE solar_life_time_energy gauge
solar_life_time_energy{app="solaredge-monitor",hostname="raspberrypi"} 942899

# HELP solar_current_power Current solar power
# TYPE solar_current_power gauge
solar_current_power{app="solaredge-monitor",hostname="raspberrypi"} 68.814545
```