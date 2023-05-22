import webapp2
import urllib2
import json


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers["Content-Type"] = "text/html"
        self.response.write('''
            <html>
            <body>
                <h1>Search nearest POST OFFICE :</h1>
                <form action="/search" method="get">
                    <input type="text" name="zipcode" placeholder="Enter zipcode">
                    <input type="text" name="branchname" placeholder="Enter branchname">
                    <input type="submit" value="Search">
                </form>    
            </body>
            </html>
        ''')


class SearchHandler(webapp2.RequestHandler):
    def get(self):
        zipcode = self.request.get("zipcode")
        branchname = self.request.get("branchname")

        if not zipcode.isdigit() or len(zipcode) != 6:
            self.response.headers["Content-Type"] = "text/html"
            self.response.write("<h2> Error, Please enter valid PINCODE of length 6! </h2>")
            return

        url = "https://api.postalpincode.in/pincode/"+zipcode

        try:
            response = urllib2.urlopen(url)
            data = json.loads(response.read())

            self.response.headers["Content-Type"] = "text/html"

            if data[0]["Status"] == "Success":
                post_office_list = data[0]['PostOffice']
                nearest_post_office = None

                for post_office in post_office_list:
                    if branchname.lower() in post_office["Name"].lower():
                        nearest_post_office = post_office
                        break

                if nearest_post_office is not None:
                    self.response.write("<p>Name: {} </p>".format(nearest_post_office["Name"]))
                    self.response.write("<p>BranchType: {} </p>".format(nearest_post_office["BranchType"]))
                    self.response.write("<p>State: {} </p>".format(nearest_post_office["State"]))
                    self.response.write("<p>Country: {} </p>".format(nearest_post_office["Country"]))

                else:
                    self.response.write("<p>No post office found with the branch name!</p>")

            else:
                self.response.write("<p>Empty or invalid response from API!</p>")

        except urllib2.URLError as e:
            self.response.headers["Content-Type"] = "text/html"
            self.response.write("<p>Error : {} </p>".format(e.reason()))



app = webapp2.WSGIApplication(
    [
        ("/", MainPage),
        ("/search", SearchHandler),
    ], debug = True
)