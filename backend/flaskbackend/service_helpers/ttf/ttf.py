import requests
import json
import os
import io
from PIL import Image
import uuid

from gradio_client import Client


def create_image_url(img_byte_arr, username):
    try:
        os.makedirs(username)
    except FileExistsError:
        pass

    identifier = uuid.uuid4()

    with open(f"{username}/{identifier}.png", "wb") as f:
        f.write(img_byte_arr)

    image_url = f"http://localhost:5000/service/sdimage?identifier={identifier}"

    return image_url


def generate_stable_diffusion_images(input_sentences, original_sentences, username):
    sentences = []
    images = []

    client = Client("https://shikhhar-11913067-compvis-stable-diffusion-v1-4.hf.space/")

    for idx, s in enumerate(input_sentences):
        result = client.predict(
            s,
            api_name="/predict",
        )

        img = Image.open(result)
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format="PNG")
        img_byte_arr = img_byte_arr.getvalue()

        image_url = create_image_url(img_byte_arr, username)

        sentences.append(original_sentences[idx])
        images.append(image_url)

    return sentences, images


def break_text_into_sentences(paragraph):
    punctuation_marks = [".", "!", "?"]
    sentences = []
    current_sentence = ""

    for char in paragraph:
        if char.isspace() and not current_sentence.strip():
            continue

        current_sentence += char

        if char in punctuation_marks:
            sentences.append(current_sentence.strip())
            current_sentence = ""

    if current_sentence.strip():
        sentences.append(current_sentence.strip())

    return sentences


def process(ip_text, username):
    op = {}
    op["error"] = {"code": 200, "message": "OK"}

    try:
        API_URL = (
            "https://m6r31v5tdk.execute-api.ap-south-1.amazonaws.com/default/pro-res"
        )
        payload = {"inputs": ip_text}
        data = json.dumps(payload, indent=2)

        response = requests.request("POST", API_URL, data=data)

        parsed_response = json.loads(response.content.decode("utf-8"))
        final_input = parsed_response[0]["summary_text"]

        stable_diffusion_input = break_text_into_sentences(final_input)
        original_input = break_text_into_sentences(ip_text)

        print("stable_diffusion_input list: ", stable_diffusion_input)
        print("***********************************************************")

        print("original_input list: ", original_input)
        print("***********************************************************")

        op["sentences"], op["images"] = generate_stable_diffusion_images(
            stable_diffusion_input, original_input, username
        )

        return op
    except:
        print("An exception occured!")
        op["error"] = {
            "code": 501,
            "message": "An exception occured.",
        }
        return op
