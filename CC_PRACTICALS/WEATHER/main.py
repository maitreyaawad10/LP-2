import webapp2
import json
import urllib2

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers["Content-Type"] = "text/html"
        self.response.write('''
            <html>
                <body>
                    <h1>Weather Forecast</h1>
                    <form action="/forecast" method="get">
                        <input type="text" name="latitude" placeholder="Enter latitude">
                        <input type="text" name="longitude" placeholder="Enter longitude">
                        <input type="submit" value="Forecast">
                    </form>
                </body>
            </html>
        ''')


class ForecastHandler(webapp2.RequestHandler):
    def get(self):
        latitude = self.request.get("latitude")
        longitude = self.request.get("longitude")

        if not latitude.replace(".", "").isdigit() or not longitude.replace(".", "").isdigit():
            self.response.headers["Content-Type"] = "text/html"
            self.response.write("<h2>Enter numerical values for latitude and longitude</h2>")
            return

        url = "https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m".format(latitude=latitude, longitude=longitude)

        response = urllib2.urlopen(url)
        data = json.loads(response.read())

        self.response.headers["Content-Type"] = "text/html"

        if "latitude" in data and "longitude" in data:
            self.response.write("Weather details for required latitude and longitude")

            if "hourly" in data:
                hourly_data = data["hourly"]

                num_hours = 10
                
                self.response.write("<ul>")
                for hour in range(num_hours):
                    temperature = hourly_data["temperature_2m"][hour]
                    self.response.write("<li>Hour {} : {} degree celsius</li>".format(hour, temperature))
                self.response.write("</ul>")

        else:
            self.response.write("<h3>Invalid or empty response from API</h3>")



app = webapp2.WSGIApplication(
    [
        ("/", MainPage),
        ("/forecast", ForecastHandler),
    ], debug=True
)