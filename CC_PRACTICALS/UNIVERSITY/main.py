import webapp2
import urllib2
import json


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers["Content-Type"] = "text/html"
        self.response.write('''
            <html>
            <body>
                <h1>Search Universities : </h1>
                <form action="/search" method="get">
                    <input type="text" name="name" placeholder="Enter university name">
                    <input type="submit" value="search">
                </form>
            </body>
            </html>
        ''')


class SearchHandler(webapp2.RequestHandler):
    def get(self):
        name = self.request.get("name")
        url = "http://universities.hipolabs.com/search?name=" + name

        response = urllib2.urlopen(url)
        data = json.loads(response.read())

        self.response.headers["Content-Type"] = "text/html"

        if len(data) == 0:
            self.response.write("<p>No Universities found!</p>")
        else:
            self.response.write("<h2>Universities list :</h2>")
            self.response.write("<hr />")
            
            for university in data:
                self.response.write("<h3>Name: " + university["name"] + " </h3>")
                self.response.write("<h3>Country: " + university["country"] + " </h3>")
                self.response.write("<h3>Website: " + "<a href=''>" + university['web_pages'][0] + "</a>" + "</h3>")
            
                self.response.write("<hr />")



app = webapp2.WSGIApplication(
    [
        ("/", MainPage),
        ("/search", SearchHandler),
    ], debug=True
)