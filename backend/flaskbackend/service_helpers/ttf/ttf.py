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

    op["sentences"] = ["sentence 1", "sentence 2", "sentence 3"]
    op["images"] = [
        "https://fastly.picsum.photos/id/571/800/400.jpg?hmac=9fPdCKxvsgA6cz2aYxNPvVG-C6CVvfZ2aDYtLHjSydA",
        "https://fastly.picsum.photos/id/91/800/400.jpg?hmac=sDVXj4Vl2BWmtORoBPdWcRDU_96N3Cza_h0U9S1UjhM",
        "https://fastly.picsum.photos/id/502/800/400.jpg?hmac=ahCTQb768dBBwobCuTqMnyTEGjq70HMGIUnQiYgl2mU",
    ]

    return op
