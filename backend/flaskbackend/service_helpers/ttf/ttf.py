
def process(ip_text):
    op={}
    op["error"]={
        "code":200,
        "message":"OK"
    }
    
    #example error function TO-DO: add error handling
    if len(ip_text) >50 :
        op["error"]={
        "code":501,
        "message":"API does not support string greater than 50 chars"
    }
        return op
    
    op["sentences"]=["sample sentence"]
    op["images"]=["sample image"]

    return op
