import os
from flask import Blueprint, g, session, request, Response, jsonify, send_file
from flask_cors import cross_origin


bp = Blueprint("texttospeech", __name__, url_prefix="/texttospeech")


def create_audio_url(username, userpromptid, audio_content):
    try:
        os.makedirs(username)
    except FileExistsError:
        pass

    with open(f"{username}/speech_{userpromptid}.mp3", "wb") as out:
        out.write(audio_content)

    host = request.host_url.rstrip("/")
    url_prefix = bp.url_prefix
    audio_url = f"{host}{url_prefix}/speech?speechid={userpromptid}"

    return audio_url


def get_sentences(text):
    from google.cloud import language_v1

    client = language_v1.LanguageServiceClient()

    document = language_v1.Document(
        content=text, type_=language_v1.Document.Type.PLAIN_TEXT
    )

    res_sentences = client.analyze_syntax(
        document=document, encoding_type=language_v1.EncodingType.UTF8
    ).sentences

    sentences = [sentence.text.content for sentence in res_sentences]

    return sentences


@bp.route("/synthesize_speech", methods=["POST"])
@cross_origin(supports_credentials=True)
def generate_texttospeech():
    username = session.get("username", None)

    if username is None:
        g.user = None
        return "Unauthorized", 401
    else:
        from google.cloud import texttospeech_v1beta1 as tts

        # Check if there is a better way to store credentials
        credential_path = "/Users/devyansh/google_application_credentials/lexiaid-service-account-file.json"
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credential_path

        text = request.json["text"]
        speakingrate = request.json["speakingRate"]
        userpromptid = request.json["userPromptId"]
        if request.json["voiceGender"] == "female":
            voicegender = tts.SsmlVoiceGender.FEMALE
        else:
            voicegender = tts.SsmlVoiceGender.MALE

        sentences = get_sentences(text=text)

        ssml = "<speak>"
        for index, sentence in enumerate(sentences):
            ssml += f"<mark name='{index}'/> {sentence}"
        ssml += "</speak>"

        client = tts.TextToSpeechClient()

        synthesis_input = tts.SynthesisInput(ssml=ssml)

        voice = tts.VoiceSelectionParams(language_code="en-US", ssml_gender=voicegender)

        audio_config = tts.AudioConfig(
            audio_encoding=tts.AudioEncoding.MP3, speaking_rate=speakingrate
        )

        response = client.synthesize_speech(
            request=tts.SynthesizeSpeechRequest(
                input=synthesis_input,
                voice=voice,
                audio_config=audio_config,
                enable_time_pointing=[
                    tts.SynthesizeSpeechRequest.TimepointType.SSML_MARK
                ],
            )
        )

        timepoints = []
        if "timepoints" in response:
            for timepoint in response.timepoints:
                timepoints.append(
                    {
                        "sentenceId": timepoint.mark_name,
                        "startTime": timepoint.time_seconds,
                    }
                )

        audio_url = create_audio_url(username, userpromptid, response.audio_content)

        return jsonify({"audio_url": audio_url, "time_points": timepoints})


@bp.route("/speech")
@cross_origin(supports_credentials=True)
def audio():
    username = session.get("username", None)

    if username is None:
        g.user = None
        return "Unauthorized", 401

    speechid = request.args.get("speechid")

    return send_file(f"../{username}/speech_{speechid}.mp3", mimetype="audio/mpeg")
