import os
from flask import Blueprint, g, session, request, Response, send_file
from flask_cors import cross_origin


bp = Blueprint("texttospeech", __name__, url_prefix="/texttospeech")


@bp.route("/synthesize_speech", methods=["POST"])
@cross_origin(supports_credentials=True)
def generate_texttospeech():
    username = session.get("username", None)

    if username is None:
        g.user = None
        return "Unauthorized", 401
    else:
        from google.cloud import texttospeech

        # Check if there is a better way to store credentials
        credential_path = "/Users/devyansh/google_application_credentials/lexiaid-service-account-file.json"
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credential_path

        text = request.json["text"]

        # Instantiates a client
        client = texttospeech.TextToSpeechClient()

        # Set the text input to be synthesized
        synthesis_input = texttospeech.SynthesisInput(text=text)

        # Build the voice request, select the language code ("en-US") and the ssml
        # voice gender ("neutral")
        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
        )

        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        # Perform the text-to-speech request on the text input with the selected
        # voice parameters and audio file type
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )

        # The response's audio_content is binary.
        with open("output.mp3", "wb") as out:
            out.write(response.audio_content)
            print("Audio content written to file: output.mp3")

        return send_file("../output.mp3", mimetype="audio/mpeg")

        # return Response(response.audio_content, mimetype="audio/mpeg")
