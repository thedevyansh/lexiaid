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
        speakingrate = request.json["speakingRate"]
        if request.json["voiceGender"] == "female":
            voicegender = texttospeech.SsmlVoiceGender.FEMALE
        else:
            voicegender = texttospeech.SsmlVoiceGender.MALE

        client = texttospeech.TextToSpeechClient()

        synthesis_input = texttospeech.SynthesisInput(text=text)

        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US", ssml_gender=voicegender
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3, speaking_rate=speakingrate
        )

        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )

        return Response(response.audio_content, mimetype="audio/mp3")
