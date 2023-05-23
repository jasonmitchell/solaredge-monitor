# Solaredge Monitor
See [Solaredge Monitoring API documentation](https://knowledge-center.solaredge.com/sites/kc/files/se_monitoring_api.pdf)
See [Openweathermap One Call API documentation](https://openweathermap.org/api/one-call-3)

## Getting Started
Create a `.env` file containing the following keys and populate with the appropriate values:
```
SSH_ADDR=<ssh remote address>
API_KEY=<solaredge monitoring api key>
SITE_ID=<solaredge site id>
WEATHER_API_KEY=<openweathermap api key>
LAT=<latitude of location for weather>
LONG=<longitude of location for weather>
```

Example:
```
SSH_ADDR=pi@raspberrypi.local
API_KEY=0123456789ABCDEFGHIJKLMNOPQRSTUV
SITE_ID=1234567
WEATHER_API_KEY=0123456789ABCDEFGHIJKLMNOPQRSTUV
LAT=0.000000
LONG=0.000000
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
# HELP weather_temperature Temperature in celsius
# TYPE weather_temperature gauge
weather_temperature{app="solaredge-monitor",hostname="pi3"} 11.45

# HELP weather_uvi UV index
# TYPE weather_uvi gauge
weather_uvi{app="solaredge-monitor",hostname="pi3"} 0

# HELP weather_clouds Cloud cover percentage
# TYPE weather_clouds gauge
weather_clouds{app="solaredge-monitor",hostname="pi3"} 20

# HELP weather_visibility Average visibility in metres
# TYPE weather_visibility gauge
weather_visibility{app="solaredge-monitor",hostname="pi3"} 10000

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