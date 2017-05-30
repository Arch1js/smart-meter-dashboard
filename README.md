## Smart-meter dashboard

This is part of my first IoT project (https://github.com/Arch1js/smart-temperature) with Arduino microcontroller.

# What it is?
This is a dashboard that displays real-time temperature data from my Arduino connected to a node server.

# How does it work?
The web application runs on a node that uses a PubNub web sockets to display a real-time data updates received from Arduino. Data on dashboard is updated asynchronously using Angular and jQuery. The data chart is also updated in real time using EON charting library.

What data is displayed -
* Temperature in Celsius
* Temperature in Fahrenheit
* Temperature warning message if it is outside the set limits
* Number of warning issued
* Number of measurements done
* Real-time chart with temperatures and timestamp

What can be controlled -
* Speed of the DC motor
* Temperature limits (still in development)

![Dashboard](https://image.ibb.co/jQaTHa/smart_dashboard.png)
