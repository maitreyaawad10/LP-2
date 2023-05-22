import webapp2


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.write("<h2>Fibonacci series for first 8 terms</h2>")

        a = 0
        b = 1

        self.response.write("<ul>")
        for i in range(8):
            self.response.write("<li><p>{}</p></li>".format(str(a)))
            

            a,b = b, a + b
        self.response.write("</ul>")


app = webapp2.WSGIApplication(
    [
        ("/", MainPage)
    ], debug=True
)