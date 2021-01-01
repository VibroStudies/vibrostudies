from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from rest_framework import generics
from django_filters import rest_framework as filters
from django.http import JsonResponse
import logging
from django.core import serializers
from django.forms.models import model_to_dict
import json
from django.db.models import Q
from django.contrib.auth.hashers import BCryptPasswordHasher
from django.db import IntegrityError
from rest_framework.authtoken.models import Token

console = logging.getLogger(__name__)

def checkToken(token):
    result = False
    tokenResult = AuthToken.objects.filter(key=token)
    if tokenResult.count() == 1:
        result = True
    
    return result


@api_view(["POST"])
def saveUser(request):
    result = False

    userResult = User.objects.filter(id=request.data["id"])
    if userResult.count() == 1:
        if (BCryptPasswordHasher().verify(request.data["oldPassword"], userResult.first().password)):
            user = User(id=request.data["id"], firstName=request.data["firstName"], lastName=request.data["lastName"], password=BCryptPasswordHasher().encode(request.data["newPassword"], BCryptPasswordHasher().salt()), email=request.data["email"], userPermission=1)
            user.save()
            result = True
    else:
        try:
            user = User(firstName=request.data["firstName"], lastName=request.data["lastName"], password=hashedPassword, email=request.data["email"], userPermission=1)
            user.save()
            result = True
        except IntegrityError:
            result = False

    return JsonResponse(result, safe=False)


@api_view(["POST"])
def saveUser(request):
    result = False

    userResult = User.objects.filter(id=request.data["id"])
    if userResult.count() == 1:
        if (BCryptPasswordHasher().verify(request.data["oldPassword"], userResult.first().password)):
            user = User(id=request.data["id"], firstName=request.data["firstName"], lastName=request.data["lastName"], password=BCryptPasswordHasher().encode(request.data["newPassword"], BCryptPasswordHasher().salt()), email=request.data["email"], userPermission=1)
            user.save()
            result = True
    else:
        try:
            user = User(firstName=request.data["firstName"], lastName=request.data["lastName"], password=BCryptPasswordHasher().encode(request.data["newPassword"], BCryptPasswordHasher().salt()), email=request.data["email"], userPermission=1)
            user.save()
            result = True
        except IntegrityError:
            result = False

    return JsonResponse(result, safe=False)


@api_view(["POST"])
def loginUser(request):
    result = {}
    userResult = User.objects.filter(email=request.data["email"])
    if userResult.count() == 1:
        user = userResult.first()
        if BCryptPasswordHasher().verify(request.data["password"], userResult.first().password):
            tokenResult = AuthToken.objects.filter(user=user)
            tokenResult.delete()
            token = AuthToken.objects.create(user=user)
            result = {
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "permission": user.userPermission,
                "token": token.key,
            }

    return JsonResponse(result)


@api_view(["POST"])
def checkPassword(request):
    result = False
    if checkToken(request.data["token"]):
        userResult = User.objects.filter(id=request.data["id"])
        if userResult.count() == 1:
            user = userResult.first()
            tokenResult = AuthToken.objects.filter(key=request.data["token"], user=user)
            if tokenResult.count() == 1:
                user = tokenResult.first().user
                if (BCryptPasswordHasher().verify(request.data["password"], userResult.first().password)):
                    result = True

    return JsonResponse(result, safe=False)


@api_view(["POST"])
def verifyUser(request):
    result = False
    if checkToken(request.data["token"]):
        userResult = User.objects.filter(id=request.data["id"])
        if userResult.count() == 1:
            user = userResult.first()
            tokenResult = AuthToken.objects.filter(key=request.data["token"], user=user)
            if tokenResult.count() == 1:
                result = True

    return JsonResponse(result, safe=False)


@api_view(["POST"])
def deleteUser(request, uk):
    result = False
    if checkToken(request.data["token"]):
        userResult = User.objects.filter(id=uk)
        if userResult.count() == 1:
            userResult.delete()
            result = True
    
    return JsonResponse(result, safe=False)


@api_view(["POST"])
def saveStudy(request):
    result = -1
    if checkToken(request.data["token"]):
        keyData = request.data["study"]["_keyData"]
        authorResult = User.objects.filter(id=keyData["_author"]["_id"])
        if authorResult.count() == 1:
            author = authorResult.first()

            # KEYDATA SPEICHERN
            studyResult = Study.objects.filter(id=keyData["_id"])
            if studyResult.count() == 1:
                study = Study(id=keyData["_id"], name=keyData["_name"], author=author, studyStatus=keyData["_studyStatus"], shortDescription=keyData["_shortDescription"]["_text"], fullDescription=keyData["_fullDescription"], isAmpliutdeNecessary=keyData["_amplitudeNecessary"], randomStrategy=request.data["study"]["_randomStrategy"])
            else:
                study = Study(name=keyData["_name"], author=author, studyStatus=keyData["_studyStatus"], shortDescription=keyData["_shortDescription"]["_text"], fullDescription=keyData["_fullDescription"], isAmpliutdeNecessary=keyData["_amplitudeNecessary"], randomStrategy=request.data["study"]["_randomStrategy"])
            study.save()

            # PRÜFEN OB STUDYOBJECTS NICHT MEHR EXISTIEREN UND LÖSCHEN
            studyObjectResult = AbstractStudyObject.objects.filter(studyId=study)

            usedObjectIds = []

            for qualiElement in keyData["_qualiQuestions"]:
                qualiResult = studyObjectResult.filter(objectId=qualiElement["_id"])
                qualiQuestion = None
                if qualiResult.count() == 1:
                    qualiQuestion = QualificationQuestion(id=qualiResult.first().id, name=qualiElement["_name"], studyId=study, objectId=qualiElement["_id"], studyObjectTypes=4, questionText=qualiElement["_questionText"], displayName=qualiElement["_displayName"], requiredAnswer=qualiElement["_requiredAnswer"])
                else:
                    qualiQuestion = QualificationQuestion(name=qualiElement["_name"], studyId=study, objectId=qualiElement["_id"], studyObjectTypes=4, questionText=qualiElement["_questionText"], displayName=qualiElement["_displayName"], requiredAnswer=qualiElement["_requiredAnswer"])
                
                qualiQuestion.save()
                usedObjectIds.append(qualiQuestion.objectId)


            # STUDYOBJECTS SPEICHERN
            for studyObject in request.data["study"]["_studyObjects"]:
                objectResult = studyObjectResult.filter(objectId=studyObject["_id"])
                if studyObject["objectType"] == "DateQuestion":
                    if objectResult.count() == 1:
                        dateQuestion = DateQuestion(id=objectResult.first().id, name=studyObject["_name"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=4, questionText=studyObject["_questionText"], displayName=studyObject["_displayName"], start=None, end=None)
                    else:
                        dateQuestion = DateQuestion(name=studyObject["_name"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=4, questionText=studyObject["_questionText"], displayName=studyObject["_displayName"], start=None, end=None)
                    dateQuestion.save()
                elif studyObject["objectType"] == "TextQuestion":
                    if objectResult.count() == 1:
                        textQuestion = TextQuestion(id=objectResult.first().id, name=studyObject["_name"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=4, questionText=studyObject["_questionText"], displayName=studyObject["_displayName"], length=None)
                    else:
                        textQuestion = TextQuestion(name=studyObject["_name"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=4, questionText=studyObject["_questionText"], displayName=studyObject["_displayName"], length=None)
                    textQuestion.save()
                elif studyObject["objectType"] == "LinearScaleQuestion":
                    if objectResult.count() == 1:
                        linearScaleQuestion = LinearScaleQuestion(id=objectResult.first().id, name=studyObject["_name"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=4, questionText=studyObject["_questionText"], displayName=studyObject["_displayName"], numberOfChoices=studyObject["_numberOfChoices"], leftLabel=studyObject["_leftLabel"], rightLabel=studyObject["_rightLabel"])
                    else:
                        linearScaleQuestion = LinearScaleQuestion(name=studyObject["_name"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=4, questionText=studyObject["_questionText"], displayName=studyObject["_displayName"], numberOfChoices=studyObject["_numberOfChoices"], leftLabel=studyObject["_leftLabel"], rightLabel=studyObject["_rightLabel"])
                    linearScaleQuestion.save()
                elif studyObject["objectType"] == "MultipleChoiceQuestion":
                    if objectResult.count() == 1:
                        multipleChoiceQuestion = MultipleChoiceQuestion(id=objectResult.first().id, name=studyObject["_name"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=4, questionText=studyObject["_questionText"], displayName=studyObject["_displayName"], maxChoices=studyObject["_maxChoices"])
                    else:
                        multipleChoiceQuestion = MultipleChoiceQuestion(name=studyObject["_name"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=4, questionText=studyObject["_questionText"], displayName=studyObject["_displayName"], maxChoices=studyObject["_maxChoices"])
                    multipleChoiceQuestion.save()
                    # MULTIPLE CHOICE OPTIONS SPEICHERN
                    mcOptionsResult = MultipleChoiceOption.objects.filter(questionId=multipleChoiceQuestion).delete()
                    index = 0
                    for mcOption in studyObject["_answerOptions"]:
                        answerOption = MultipleChoiceOption(answerOption=mcOption, order=index, questionId=multipleChoiceQuestion)
                        answerOption.save()
                        index = index + 1
                elif studyObject["objectType"] == "TextBlock":
                    if objectResult.count() == 1:
                        textBlock = TextBlock(id=objectResult.first().id, name=studyObject["_name"], displayName=studyObject["_displayName"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=3, text=studyObject["_text"])
                    else:                    
                        textBlock = TextBlock(name=studyObject["_name"], displayName=studyObject["_displayName"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=3, text=studyObject["_text"])
                    textBlock.save()
                elif studyObject["objectType"] == "VibrationPattern":
                    if objectResult.count() == 1:
                        vibrationPattern = VibrationPattern(id=objectResult.first().id, name=studyObject["_name"], displayName=studyObject["_displayName"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=5, randomStrategy=0)
                    else:
                        vibrationPattern = VibrationPattern(name=studyObject["_name"], displayName=studyObject["_displayName"], studyId=study, objectId=studyObject["_id"], studyObjectTypes=5, randomStrategy=0)
                    vibrationPattern.save()

                    VibrationPatternElement.objects.filter(studyId=study, pattern=vibrationPattern).delete()
                    index = 0
                    for vibElement in studyObject["_vibrationPatternElements"]:
                        if "_amplitude" in vibElement:
                            amplitude = vibElement["_amplitude"]
                        else:
                            amplitude = 0

                        toSave = VibrationPatternElement(studyId=study, order=index, pattern=vibrationPattern, duration=vibElement["_duration"], amplitude=amplitude)
                        toSave.save()
                        index = index + 1
                
                usedObjectIds.append(studyObject["_id"])

            # NICHT VERWENDETE STUDYOBJECTS LÖSCHEN
            for usedId in usedObjectIds:
                studyObjectResult = studyObjectResult.exclude(objectId=usedId)
                
            studyObjectResult.delete()

            # PRÜFEN OB SECTIONELEMENTS NICHT MEHR EXISTIEREN UND LÖSCHEN
            sectionElementsResult = SectionElement.objects.filter(studyId=study)

            usedSectionElementsId = []

            # SECTIONELEMENTS SPEICHERN
            SectionElementToStudyObjectRef.objects.filter(studyId=study).delete()
            for sectionElement in request.data["study"]["_sectionElements"]:
                seResult = sectionElementsResult.filter(objectId=sectionElement["_id"])
                if seResult.count() == 1:
                    seToSave = SectionElement(id=seResult.first().id, name=sectionElement["_name"], displayName=sectionElement["_displayName"], studyId=study, objectId=sectionElement["_id"], studyObjectTypes=2, randomStrategy=sectionElement["_randomStrategy"], resultRelevant=sectionElement["_resultRelevant"], skippable=sectionElement["_skippable"])
                else: 
                    seToSave = SectionElement(name=sectionElement["_name"], displayName=sectionElement["_displayName"], studyId=study, objectId=sectionElement["_id"], studyObjectTypes=2, randomStrategy=sectionElement["_randomStrategy"], resultRelevant=sectionElement["_resultRelevant"], skippable=sectionElement["_skippable"])
                seToSave.save()
                usedSectionElementsId.append(seToSave.id)

                # SECTIONELEMENT TO STUDY OBJECT SPEICHERN
                
                index = 0
                for ref in sectionElement["_studyObjects"]:
                    toSave = SectionElementToStudyObjectRef(studyId=study, order=index, sectionElement=seToSave, isFixed=ref["_isFixed"], studyObject=AbstractStudyObject.objects.filter(studyId=study, objectId=ref["_ID"]).first())
                    toSave.save()
                    index = index + 1
            
            for usedId in usedSectionElementsId:
                sectionElementsResult = sectionElementsResult.exclude(id=usedId)
            
            sectionElementsResult.delete()

            # PRÜFEN OB SECTIONS NICHT MEHR EXISTIEREN UND LÖSCHEN
            sectionsResult = Section.objects.filter(studyId=study)

            usedSectionIds = []

            # SECTIONS SPEICHERN
            SectionToSectionElementRef.objects.filter(studyId=study).delete()
            for section in request.data["study"]["_sections"]:
                sectionResult = sectionsResult.filter(objectId=section["_id"])
                if sectionResult.count() == 1:
                    sToSave = Section(id=sectionResult.first().id, name=section["_name"], displayName=section["_displayName"], studyId=study, objectId=section["_id"], studyObjectTypes=1, randomStrategy=section["_randomStrategy"], resultRelevant=section["_resultRelevant"], skippable=section["_skippable"])
                else:
                    sToSave = Section(name=section["_name"], displayName=section["_displayName"], studyId=study, objectId=section["_id"], studyObjectTypes=1, randomStrategy=section["_randomStrategy"], resultRelevant=section["_resultRelevant"], skippable=section["_skippable"])
                sToSave.save()
                usedSectionIds.append(sToSave.id)

                # SECTION TO SECTIONELEMENT SPEICHERN
                index = 0
                for ref in section["_sectionElements"]:
                    toSave = SectionToSectionElementRef(studyId=study, order=index, section=sToSave, sectionElement=SectionElement.objects.filter(studyId=study, objectId=ref["_ID"]).first(), isFixed=ref["_isFixed"])
                    toSave.save()
                    index = index + 1

            for usedId in usedSectionIds:
                sectionsResult = sectionsResult.exclude(id=usedId)
            
            sectionsResult.delete()

            # SECTION ORDER SPEICHERN
            SectionOrder.objects.filter(studyId=study).delete()
            index = 0
            for ref in request.data["study"]["_refSections"]:
                toSave = SectionOrder(studyId=study, order=index, section=Section.objects.filter(studyId=study, objectId=ref["_ID"]).first(), isFixed=ref["_isFixed"])
                toSave.save()
                index = index + 1
            
            result = study.id
            
    return JsonResponse(result, safe=False)


@api_view(["POST"])
def deleteStudy(request, pk):
    result = False
    tokenResult = AuthToken.objects.filter(key=request.data["token"])
    if tokenResult.count() == 1:
        studyResult = Study.objects.filter(id=pk)
        if studyResult.count() == 1:
            user = tokenResult.first().user
            study = studyResult.first()
            if study.author.id == user.id:
                study.delete()
                result = True
        
    return JsonResponse(result, safe=False)


@api_view(["POST"])
def updateStudyStatus(request, pk):
    # TODO
    result = False
    if checkToken(request.data["token"]):
        studyResult = Study.objects.filter(id=pk)
        if studyResult.count() == 1:
            study = studyResult.first()
            study.studyStatus = request.data["state"]
            study.save()
            result = True
            
    return JsonResponse(result, safe=False)


@api_view(["POST"])
def myStudies(request, uk):
    result = []
    if checkToken(request.data["token"]):
        userResult = User.objects.filter(id=uk)
        if userResult.count() == 1:
            user = userResult.first()
            if user.userPermission > 0:
                studiesResult = Study.objects.filter(author=user)
                for study in studiesResult:
                    result.append(model_to_dict(study))
        
    return JsonResponse(result, safe=False)


@api_view(["POST"])
def availableStudies(request):
    result = []
    if checkToken(request.data["token"]):
        userResult = User.objects.filter(id=request.query_params.get("userId"))
        hasAmplitude = request.query_params.get("hasAmplitude")
        if hasAmplitude == "false":
            hasAmplitude = False
        else:
            hasAmplitude = True
        if userResult.count() == 1:
            user = userResult.first()

            studiesResult = Study.objects.exclude(author=user).filter(studyStatus=StudyStatus.PUBLISHED)

            # EXCLUDE TEILGENOMMENE STUDIEN
            participantResult = Participant.objects.filter(userId=user.id)
            for participated in participantResult:
                studiesResult = studiesResult.exclude(id=participated.studyId.id)
            
            if hasAmplitude == False:
                studiesResult = studiesResult.exclude(isAmpliutdeNecessary=True)
                
            for study in studiesResult:
                result.append({
                    "id": study.id,
                    "author": {
                        "firstName": study.author.firstName,
                        "lastName": study.author.lastName,
                        "email": study.author.email,
                    },
                    "studyStatus": study.studyStatus,
                    "shortDescription": study.shortDescription,
                    "fullDescription": study.fullDescription,
                    "amplitudeNecessary": study.isAmpliutdeNecessary,
                    "name": study.name,
                })
            console.error(studiesResult)
    return JsonResponse(result, safe=False)


@api_view(["POST"])
def participatedStudies(request, uk):
    result = []
    if checkToken(request.data["token"]):
        userResult = User.objects.filter(id=uk)
        if userResult.count() == 1:
            user = userResult.first()
            participatedResult = Participant.objects.filter(userId=uk)
            for participation in participatedResult:
                result.append({
                    "id": participation.studyId.id,
                    "author": {
                        "firstName": participation.studyId.author.firstName,
                        "lastName": participation.studyId.author.lastName,
                        "email": participation.studyId.author.email,
                    },
                    "studyStatus": participation.studyId.studyStatus,
                    "shortDescription": participation.studyId.shortDescription,
                    "fullDescription": participation.studyId.fullDescription,
                    "amplitudeNecessary": participation.studyId.isAmpliutdeNecessary,
                    "name": participation.studyId.name,
                    "completed": participation.completed,
                })

    return JsonResponse(result, safe=False)


@api_view(["POST"])
def resultView(request, pk):
    result = []
    if checkToken(request.data["token"]):
            participantsResult = Participant.objects.filter(studyId=pk, completed=True)
            if participantsResult.count() > 0:
                
                for participant in participantsResult:
                    questionAnswers = []
                    # DATE ANSWER
                    dateAnswersResult = DateAnswer.objects.filter(studyId=pk, user=participant.userId)
                    for dateAnswer in dateAnswersResult:
                        questionAnswers.append({
                            "objectId": dateAnswer.questionId.objectId,
                            "answer": dateAnswer.answer,
                        })

                    # LINEAR SCALE ANSWER
                    linearScaleAnswersResult = LinearScaleAnswer.objects.filter(studyId=pk, user=participant.userId)
                    for linearScaleAnswer in linearScaleAnswersResult:
                        questionAnswers.append({
                            "objectId": linearScaleAnswer.questionId.objectId,
                            "answer": linearScaleAnswer.answer,
                        })

                    # MULTIPLE CHOICE ANSWER
                    multipleChoiceAnswersResult = MultipleChoiceAnswer.objects.filter(studyId=pk, user=participant.userId)
                    for multipleChoiceAnswer in multipleChoiceAnswersResult:
                        mcAnswerOptionsResult = MultipleChoiceAnswerOption.objects.filter(multipleChoiceAnswerRef=multipleChoiceAnswer).order_by("order")
                        mcAnswerOptions = []
                        for mcAnswerOption in mcAnswerOptionsResult:
                            mcAnswerOptions.append(mcAnswerOption.answer)
                        questionAnswers.append({
                            "objectId": multipleChoiceAnswer.questionId.objectId,
                            "answer": mcAnswerOptions,
                        })



                    # TEXT ANSWER
                    textAnswersResult = TextAnswer.objects.filter(studyId=pk, user=participant.userId)
                    for textAnswer in textAnswersResult:
                        questionAnswers.append({
                            "objectId": textAnswer.questionId.objectId,
                            "answer": textAnswer.answer,
                        })

                    metaData = MetaData.objects.filter(participant=participant)

                    result.append({
                        "participant": {
                            "email": participant.userId.email,
                            "firstName": participant.userId.firstName,
                            "lastName": participant.userId.lastName,
                        },
                        "answers": questionAnswers,
                        "metaData": model_to_dict(metaData.first()),
                    })
        
    return JsonResponse(result, safe=False)


@api_view(["POST"])
def getUser(request, uk):
    result = {}
    if checkToken(request.data["token"]):
        userResult = User.objects.filter(id=uk)
        if userResult.count() == 1:
            user = userResult.first()
            result = {
                "id": user,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "userPermission": user.userPermission,
                "email": user.email,
            }
    return JsonResponse(result)


@api_view(["POST"])
def studyView(request, pk):
    result = {}
    if checkToken(request.data["token"]):
        # KEYDATA BESTELLEN
        keyDataResponse = Study.objects.filter(id=pk)
        if keyDataResponse.count() == 1:            # NUR, FALLS ES DIE STUDIE AUCH GIBT, WEITERMACHEN
            keyDataObject = keyDataResponse.first()

            # QUALIFIKATIONSFRAGEN EINSAMMELN
            qualificationQuestionsResponse = QualificationQuestion.objects.filter(studyId=pk)
            qualificationQuestions = []

            for qualificationQuestion in qualificationQuestionsResponse:
                qualificationQuestions.append({
                    "id": qualificationQuestion.objectId,
                    "name": qualificationQuestion.name,
                    "questionText": qualificationQuestion.questionText,
                    "displayName": qualificationQuestion.displayName,
                    "requiredAnswer": qualificationQuestion.requiredAnswer,
                })

            keyData = {
                "id": keyDataObject.id,
                "author": {
                    "id": keyDataObject.author.id,
                    "firstName": keyDataObject.author.firstName,
                    "lastName": keyDataObject.author.lastName,
                    "permission": keyDataObject.author.userPermission,
                    "password": keyDataObject.author.password,
                    "email": keyDataObject.author.email,
                },
                "amplitudeNecessary": keyDataObject.isAmpliutdeNecessary,
                "studyStatus": keyDataObject.studyStatus,
                "name": keyDataObject.name,
                "shortDescription": keyDataObject.shortDescription,
                "fullDescription": keyDataObject.fullDescription,
                "qualiQuestions": qualificationQuestions,
            }

            # SECTION VERWEISE EINSAMMELN
            sectionOrdersResponse = SectionOrder.objects.filter(studyId=pk).order_by("order")
            sectionOrders = []
            for sectionOrder in sectionOrdersResponse:
                sectionOrders.append({
                    "ID": sectionOrder.section.objectId,
                    "isFixed": sectionOrder.isFixed,
                })

            # SECTIONS EINSAMMELN
            sectionsResponse = Section.objects.filter(studyId=pk)
            sections = []
            for section in sectionsResponse:
                # VERWEISE ZU SECTIONELEMENTS EINSAMMELN
                sectionToSectionElementRefsResponse = SectionToSectionElementRef.objects.filter(studyId=pk, section=section).order_by("order")
                sectionToSectionElementRefs = []

                # BENÖTIGTE FORM FÜR REFERENZEN BASTELN
                for sectionToSectionElementRef in sectionToSectionElementRefsResponse:
                    sectionToSectionElementRefs.append({
                        "ID": sectionToSectionElementRef.sectionElement.objectId,
                        "isFixed": sectionToSectionElementRef.isFixed,
                    })

                # BENÖTIGTE FORM FÜR SECTIONS BASTELN
                sections.append({
                    "id": section.objectId,
                    "name": section.name,
                    "displayName": section.displayName,
                    "skippable": section.skippable,
                    "resultRelevant": section.resultRelevant,
                    "randomStrategy": section.randomStrategy,
                    "sectionElements": sectionToSectionElementRefs,
                    "studyObectTypes": section.studyObjectTypes,
                })

            # SECTIONELEMENTS EINSAMMELN
            sectionElementsResponse = SectionElement.objects.filter(studyId=pk)
            sectionElements = []
            for sectionElement in sectionElementsResponse:
                sectionElementToStudyObjectRefsResponse = SectionElementToStudyObjectRef.objects.filter(studyId=pk, sectionElement=sectionElement).order_by("order")
                sectionElementToStudyObjectRefs = []
                
                # BENÖTIGTE FORM FÜR REFERENZEN BASTELN
                for sectionElementToStudyObjectRef in sectionElementToStudyObjectRefsResponse:
                    sectionElementToStudyObjectRefs.append({
                        "ID": sectionElementToStudyObjectRef.studyObject.objectId,
                        "isFixed": sectionElementToStudyObjectRef.isFixed,
                    })

                sectionElements.append({
                    "id": sectionElement.objectId,
                    "name": sectionElement.name,
                    "displayName": sectionElement.displayName,
                    "randomStrategy": sectionElement.randomStrategy,
                    "resultRelevant": sectionElement.resultRelevant,
                    "studyObjects": sectionElementToStudyObjectRefs,
                })

            # STUDIENOBJEKTE EINSAMMELN
            studyObjects = []

            textBlocksResult = TextBlock.objects.filter(studyId=pk)
            
            for textBlock in textBlocksResult:
                studyObjects.append({
                    "id": textBlock.objectId,
                    "name": textBlock.name,
                    "displayName": textBlock.displayName,
                    "text": textBlock.text,
                    "studyObjectTypes": textBlock.studyObjectTypes,
                })

            vibrationPatternsResult = VibrationPattern.objects.filter(studyId=pk)

            for vibrationPattern in vibrationPatternsResult:
                vibrationPatternElementsResult = VibrationPatternElement.objects.filter(pattern=vibrationPattern.id)
                vibrationPatternElements = []

                for vibrationPatternElement in vibrationPatternElementsResult:
                    vibrationPatternElements.append({
                        "duration": vibrationPatternElement.duration,
                        "amplitude": vibrationPatternElement.amplitude,
                    })

                studyObjects.append({
                    "id": vibrationPattern.objectId,
                    "name": vibrationPattern.name,
                    "displayName": vibrationPattern.displayName,
                    "vibrationPatternElements": vibrationPatternElements,
                    "studyObjectTypes": vibrationPattern.studyObjectTypes,
                })

            dateQuestionsResult = DateQuestion.objects.filter(studyId=pk)

            for dateQuestion in dateQuestionsResult:
                studyObjects.append({
                    "id": dateQuestion.objectId,
                    "name": dateQuestion.name,
                    "displayName": dateQuestion.displayName,
                    "questionText": dateQuestion.questionText,
                    "displayName": dateQuestion.displayName,
                    "studyObjectTypes": dateQuestion.studyObjectTypes,
                    "questionType": 0,
                })

            linearScaleQuestionsResult = LinearScaleQuestion.objects.filter(studyId=pk)

            for linearScaleQuestion in linearScaleQuestionsResult:
                studyObjects.append({
                    "id": linearScaleQuestion.objectId,
                    "name": linearScaleQuestion.name,
                    "displayName": linearScaleQuestion.displayName,
                    "questionText": linearScaleQuestion.questionText,
                    "numberOfChoices": linearScaleQuestion.numberOfChoices,
                    "displayName": linearScaleQuestion.displayName,
                    "leftLabel": linearScaleQuestion.leftLabel,
                    "rightLabel": linearScaleQuestion.rightLabel,
                    "studyObjectTypes": linearScaleQuestion.studyObjectTypes,
                    "questionType": 1,
                })

            multipleChoiceQuestionsResult = MultipleChoiceQuestion.objects.filter(studyId=pk)

            for multipleChoiceQuestion in multipleChoiceQuestionsResult:
                answerOptionsResult = MultipleChoiceOption.objects.filter(questionId=multipleChoiceQuestion.id)
                answerOptions = []

                for answerOption in answerOptionsResult:
                    answerOptions.append(answerOption.answerOption)

                studyObjects.append({
                    "id": multipleChoiceQuestion.objectId,
                    "name": multipleChoiceQuestion.name,
                    "displayName": multipleChoiceQuestion.displayName,
                    "questionText": multipleChoiceQuestion.questionText,
                    "displayName": multipleChoiceQuestion.displayName,
                    "answerOptions": answerOptions,
                    "maxChoices": multipleChoiceQuestion.maxChoices,
                    "studyObjectTypes": multipleChoiceQuestion.studyObjectTypes,
                    "questionType": 2,
                })

            textQuestionsResult = TextQuestion.objects.filter(studyId=pk)

            for textQuestion in textQuestionsResult:
                studyObjects.append({
                    "id": textQuestion.objectId,
                    "name": textQuestion.name,
                    "displayName": textQuestion.displayName,
                    "questionText": textQuestion.questionText,
                    "displayName": textQuestion.displayName,
                    "studyObjectTypes": textQuestion.studyObjectTypes,
                    "questionType": 3,
                })


            # STUDIE ZUSAMMENBASTELN
            study = {
                "keyData": keyData,
                "refSections": sectionOrders,
                "sections": sections,
                "sectionElements": sectionElements,
                "studyObjects": studyObjects,
                "randomStrategy": keyDataObject.randomStrategy,
            }
            
            # ALS JSON ZURÜCKGEBEN
            result = study
    
    return JsonResponse(result)


@api_view(["POST"])
def saveResult(request):
    result = False
    if checkToken(request.data["token"]):
        participantResult = Participant.objects.filter(id=request.data["participantId"])
        studyResult = Study.objects.filter(id=request.data["studyId"])
        userResult = User.objects.filter(id=request.data["userId"])
        if participantResult.count() == 1 & studyResult.count() == 1:
            participant = participantResult.first()
            user = userResult.first()
            study = studyResult.first()
            
            mdr = request.data["metaData"] # mdr = metaDataRequest
            print(mdr)
            metaData = MetaData(brand=mdr["_brand"], device=mdr["_device"], display=mdr["_display"], hardware=mdr["_hardware"], manufacturer=mdr["_manufacturer"], model=mdr["_model"], product=mdr["_product"], androidsdk=mdr["_androidsdk"], timeInMs=mdr["_timeInMs"], hasAmplitude=mdr["_hasAmplitude"], participant=participant, study=study)
            metaData.save()
            
            index = 0
            for answer in request.data["answeredQuestions"]:
                
                if answer["object"]["objectType"] == "DateQuestion":
                    questionId = DateQuestion.objects.filter(studyId=request.data["studyId"], objectId=answer["originalObjectId"]).first()
                    dateAnswer = DateAnswer(studyId=study, order=index, user=user, questionId=questionId, answer=answer["object"]["_answer"], participantId=participant)
                    dateAnswer.save()
                elif answer["object"]["objectType"] == "LinearScaleQuestion":
                    questionId = LinearScaleQuestion.objects.filter(studyId=request.data["studyId"], objectId=answer["originalObjectId"]).first()
                    linearScaleAnswer = LinearScaleAnswer(studyId=study, order=index, user=user, questionId=questionId, answer=answer["object"]["_answer"], participantId=participant)
                    linearScaleAnswer.save()
                elif answer["object"]["objectType"] == "MultipleChoiceQuestion":
                    questionId = MultipleChoiceQuestion.objects.filter(studyId=request.data["studyId"], objectId=answer["originalObjectId"]).first()
                    multipleChoiceAnswer = MultipleChoiceAnswer(studyId=study, order=index, participantId=participant, user=user, questionId=questionId)
                    multipleChoiceAnswer.save()
                    index2 = 0
                    for answerOption in answer["object"]["_answer"]:
                        mcOptionAnswer = MultipleChoiceAnswerOption(order=index2, answer=answerOption, multipleChoiceAnswerRef=multipleChoiceAnswer)
                        mcOptionAnswer.save()
                        index2 = index2 + 1
                elif answer["object"]["objectType"] == "TextQuestion":
                    questionId = TextQuestion.objects.filter(studyId=request.data["studyId"], objectId=answer["originalObjectId"]).first()
                    textAnswer = TextAnswer(studyId=study, order=index, participantId=participant, user=user, questionId=questionId, answer=answer["object"]["_answer"])
                    textAnswer.save()
                    
                index = index + 1
                
            participant.completed = True
            participant.save()
            
            result = True
                        
    return JsonResponse(result, safe=False)


@api_view(["POST"])
def startStudy(request):
    result = -1
    if checkToken(request.data["token"]):
        userResult = User.objects.filter(id=request.data["userId"])
        if userResult.count() == 1:
            user = userResult.first()
            studyResult = Study.objects.filter(id=request.data["studyId"])
            if studyResult.count() == 1:
                study = studyResult.first()
                participation = Participant(studyId=study, userId=user, completed=False)
                participation.save()
                result = participation.id
                
    return JsonResponse(result, safe=False)