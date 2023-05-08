import os
import uuid
from flask import Blueprint, g, session, request, Response, jsonify, send_file
from flask_cors import cross_origin
from google.cloud import storage


bp = Blueprint("texttospeech", __name__, url_prefix="/texttospeech")


def create_audio_url(audiocontent, username, userpromptid):
    bucket_name = "audio-bucket-lexiaid"
    file_substring = f"{username}/speech_{userpromptid}"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    blobs = bucket.list_blobs()

    for blob in blobs:
        if file_substring in blob.name:
            blob.delete()

    identifier = uuid.uuid4()
    filename = f"{username}/speech_{userpromptid}_{identifier}.mp3"
    blob = bucket.blob(filename)
    blob.upload_from_string(audiocontent, content_type="audio/mpeg")

    audio_url = f"https://storage.googleapis.com/{bucket_name}/{filename}"

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
            voicename = "en-US-Standard-G"
            voicegender = tts.SsmlVoiceGender.FEMALE
        else:
            voicename = "en-US-Standard-D"
            voicegender = tts.SsmlVoiceGender.MALE

        sentences = get_sentences(text=text)

        ssml = "<speak>"
        for index, sentence in enumerate(sentences):
            ssml += f"<mark name='{index}'/> {sentence}"
        ssml += "</speak>"

        client = tts.TextToSpeechClient()

        synthesis_input = tts.SynthesisInput(ssml=ssml)

        voice = tts.VoiceSelectionParams(
            language_code="en-US", name=voicename, ssml_gender=voicegender
        )

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
            for idx, timepoint in enumerate(response.timepoints):
                timepoints.append(
                    {
                        "sentenceId": timepoint.mark_name,
                        "sentence": sentences[idx],
                        "startTime": timepoint.time_seconds,
                    }
                )

        audio_url = create_audio_url(response.audio_content, username, userpromptid)

        return jsonify({"audio_url": audio_url, "time_points": timepoints})
