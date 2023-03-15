def process(ip_text):
    op = {}
    op["error"] = {"code": 200, "message": "OK"}

    # example error function TO-DO: add error handling
    if len(ip_text) > 50:
        op["error"] = {
            "code": 501,
            "message": "API does not support string greater than 50 chars",
        }
        return op

    op["sentences"] = [
        "Urbanization and deforestation increase the risk of wildfires.",
        "Climate change is affecting the timing and distribution of seasonal events.",
        "Acid rain damages soil.",
    ]
    op["images"] = [
        "https://news.climate.columbia.edu/wp-content/uploads/2014/10/Deerfire_-600x370.jpg",
        "https://climateknowledgeportal.worldbank.org//sites/default/files/inline-images/Fig2.jpg",
        "https://images.interestingengineering.com/1200x675/img/iea/Xm6lqlZ1wD/acid-rain-header.jpg",
    ]

    return op
