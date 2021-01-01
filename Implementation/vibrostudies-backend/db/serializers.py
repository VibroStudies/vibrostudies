# serializers.py
from rest_framework import serializers
from .models import *


class MetaDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MetaData
        fields = ("id", "brand", "device", "display", "hardware", "manufacturer", "model", "product", "androidsdk", "hasAmplitude", "timeInMs", "participant", "study")


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id','firstName', 'lastName', 'email', 'userPermission')


class StudySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Study
        fields = ('id', 'author', 'studyStatus',
                  'shortDescription', 'fullDescription', 'isAmpliutdeNecessary', 'name', 'randomStrategy')

class AbstractStudyObjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AbstractStudyObject
        fields = ('id', 'studyId', 'objectId', 'name', 'displayName', 'studyObjectTypes')

class QualificationQuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = QualificationQuestion
        fields = ('id', 'studyId', 'objectId', 'name', 'displayName', 'studyObjectTypes', 'questionText', 'requiredAnswer')

class DateQuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DateQuestion
        fields = ('id', 'studyId', 'objectId', 'name', 'studyObjectTypes', 'questionText', 'displayName', 'start', 'end')

class LinearScaleQuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LinearScaleQuestion
        fields = ('id', 'studyId', 'objectId', 'name', 'studyObjectTypes', 'questionText', 'displayName', 'numberOfChoices',
                    'leftLabel', 'rightLabel')

class MultipleChoiceQuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MultipleChoiceQuestion
        fields = ('id', 'studyId', 'objectId', 'name', 'studyObjectTypes', 'questionText', 'displayName', 'maxChoices')

class MultipleChoiceOptionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MultipleChoiceOption
        fields = ('id', 'answerOption', 'order', 'questionId')


class TextQuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TextQuestion
        fields = ('id', 'studyId', 'objectId', 'name', 'studyObjectTypes', 'questionText', 'displayName', 'length')

class AbstractAnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AbstractAnswer
        fields = ('id', 'studyId', 'user', 'order')

class DateAnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DateAnswer
        fields = ('id', 'studyId', 'user', 'order', 'questionId', 'answer')

class LinearScaleAnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LinearScaleAnswer
        fields = ('id', 'studyId', 'user', 'order', 'questionId', 'answer')

class MultipleChoiceAnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MultipleChoiceAnswer
        fields = ('id', 'studyId', 'user', 'order', 'questionId')

class MultipleChoiceAnswerOptionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MultipleChoiceAnswerOption
        fields = ('id', 'order', 'multipleChoiceAnswerRef', 'answer')       

class TextAnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TextAnswer
        fields = ('id', 'studyId', 'user', 'order', 'questionId', 'answer')

class TextBlockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TextBlock
        fields = ('id', 'studyId', 'objectId', 'name', 'displayName', 'text', "studyObjectTypes")

class SectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Section
        fields = ('id', 'name', 'displayName', 'studyId', 'objectId', 'studyObjectTypes', 'resultRelevant', 'skippable', 'randomStrategy')

class SectionElementSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SectionElement
        fields = ('id', 'name', 'displayName', 'studyId', 'objectId', 'studyObjectTypes', 'randomStrategy', 'skippable', "resultRelevant")

class ReferenceTupleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ReferenceTuple
        fields = ('id', 'studyId', 'containerId', 'memberId')

class VibrationPatternElementSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = VibrationPatternElement
        fields = ('id', 'studyId', 'pattern', 'duration', 'amplitude', 'order')  

class VibrationPatternSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = VibrationPattern
        fields = ('id', 'name', 'displayName', 'studyId', 'objectId', 'studyObjectTypes', 'randomStrategy')             


class SectionToSectionElementRefSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SectionToSectionElementRef
        fields = ('id', 'studyId', 'section', 'sectionElement', 'order', 'isFixed') 

class SectionElementToStudyObjectRefSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SectionElementToStudyObjectRef
        fields = ('id', 'studyId', 'studyObject', 'sectionElement', 'order', 'isFixed')    

class SectionOrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SectionOrder
        fields = ('id', 'studyId', 'section', 'order', 'isFixed')     

class ParticipantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Participant
        fields = ('id', 'studyId', 'userId', 'completed')     
