import binascii
import os
from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _
#from django_mysql.models import ListTextField
from django.contrib.postgres.fields import ArrayField

from .utils import *





class User(models.Model):
    id = models.AutoField(primary_key=True)
    firstName = models.TextField()
    lastName = models.TextField()
    password = models.TextField()
    email = models.EmailField(max_length=254, unique=True)
    userPermission = models.IntegerField(choices=PermissionTypes.choices(), default=PermissionTypes.PARTICIPANT)

    def get_permission_type_label(self):
        return PermissionTypes(self.userPermission).name.title()



class Study(models.Model):   
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(User, verbose_name="User", on_delete=models.CASCADE)
    studyStatus = models.IntegerField(choices=StudyStatus.choices(), default=StudyStatus.CREATED)
    shortDescription = models.CharField(max_length=500)
    fullDescription = models.TextField()
    isAmpliutdeNecessary = models.BooleanField(default=False)
    name = models.TextField()
    randomStrategy = models.IntegerField(choices=RandomizingStrategies.choices(), default=RandomizingStrategies.STANDARD)
    def get_randomStrategy_type_label(self):
        return RandomizingStrategies(self.randomStrategy).name.title()
    def get_studyStatus_type_label(self):
        return StudyStatus(self.studyStatus).name.title()
    def __str__(self):
        return str(self.id)

# Relationen der Study Objects
class AbstractStudyObject(models.Model):
    id = models.AutoField(primary_key=True)
    studyId = models.ForeignKey(Study, on_delete=models.CASCADE)
    objectId = models.IntegerField()
    name = models.TextField(null=True)
    displayName = models.TextField(null=True)
    studyObjectTypes = models.IntegerField(choices=StudyObjectTypes.choices())

    class Meta:
        #abstract = True
        constraints = [
            models.UniqueConstraint(fields=['studyId', 'objectId'], name='Uniquenes of studyId and objectId')
        ]


class AbstractQuestion(AbstractStudyObject):
    questionText = models.TextField()
    class Meta:
        abstract = True

class QualificationQuestion(AbstractQuestion):
    requiredAnswer = models.BooleanField(null=True)

class DateQuestion(AbstractQuestion):
    start=models.DateField(auto_now=False, auto_now_add=False, null=True)
    end=models.DateField(auto_now=False, auto_now_add=False, null=True)

class LinearScaleQuestion(AbstractQuestion):
    numberOfChoices = models.IntegerField()
    leftLabel = models.TextField()
    rightLabel = models.TextField()

class MultipleChoiceQuestion(AbstractQuestion):
    maxChoices = models.IntegerField(null=True)

class MultipleChoiceOption(models.Model):
    id = models.AutoField(primary_key=True)
    answerOption = models.TextField()
    order = models.IntegerField()
    questionId = models.ForeignKey(MultipleChoiceQuestion, on_delete=models.CASCADE)

class TextQuestion(AbstractQuestion):
    length = models.IntegerField(null=True)

class Participant(models.Model):
    id = models.AutoField(primary_key=True)
    studyId = models.ForeignKey(Study, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    class Meta:
        #abstract = True
        constraints = [
            models.UniqueConstraint(fields=['studyId', 'userId'], name='Uniquenes of studyId and userId')
        ]

class AbstractAnswer(models.Model):
    id = models.AutoField(primary_key=True)
    participantId = models.ForeignKey(Participant, on_delete=models.CASCADE)
    studyId = models.ForeignKey(Study, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.IntegerField()
    class Meta:
        #abstract = True
        constraints = [
            models.UniqueConstraint(fields=['studyId', 'user', 'order', 'participantId'], name='Uniquenes of studyId and user and order')
        ]

class DateAnswer(AbstractAnswer):
    questionId = models.ForeignKey(DateQuestion, on_delete=models.CASCADE)
    answer = models.DateField(auto_now=False, auto_now_add=False)

class LinearScaleAnswer(AbstractAnswer):
    questionId = models.ForeignKey(LinearScaleQuestion, on_delete=models.CASCADE)
    answer=models.IntegerField()

class MultipleChoiceAnswer(AbstractAnswer):
    questionId = models.ForeignKey(MultipleChoiceQuestion, on_delete=models.CASCADE)

class MultipleChoiceAnswerOption(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.IntegerField()
    multipleChoiceAnswerRef = models.ForeignKey(MultipleChoiceAnswer, on_delete=models.CASCADE)
    answer = models.TextField()

class TextAnswer(AbstractAnswer):
    questionId = models.ForeignKey(TextQuestion, on_delete=models.CASCADE)
    answer = models.TextField()
    

class TextBlock(AbstractStudyObject):
    text = models.TextField(null=True)

# Sections und Section Elements
class Section(AbstractStudyObject):
    resultRelevant = models.BooleanField()
    skippable = models.BooleanField()
    randomStrategy = models.IntegerField(choices=RandomizingStrategies.choices(), default=RandomizingStrategies.STANDARD)
    # sectionElements = eigene Tabelle


class SectionElement(AbstractStudyObject):
    # studyObjects = eigene Tabelle
    randomStrategy = models.IntegerField(choices=RandomizingStrategies.choices(), default=RandomizingStrategies.STANDARD)
    skippable = models.BooleanField()
    resultRelevant = models.BooleanField()

# TODO check, dass Fremdschlüssel zur selben Studie gehören
class ReferenceTuple(models.Model):
    id = models.AutoField(primary_key=True)
    studyId = models.ForeignKey(Study, on_delete=models.CASCADE)
    containerId = models.ForeignKey(AbstractStudyObject, related_name='container_id', on_delete=models.CASCADE)
    memberId = models.ForeignKey(AbstractStudyObject, related_name='member_id', on_delete=models.CASCADE)




class VibrationPattern(AbstractStudyObject):
    randomStrategy = models.IntegerField(choices=RandomizingStrategies.choices(), default=RandomizingStrategies.STANDARD)

class VibrationPatternElement(models.Model):
    id = models.AutoField(primary_key=True)
    studyId = models.ForeignKey(Study, on_delete=models.CASCADE)
    pattern = models.ForeignKey(VibrationPattern, on_delete=models.CASCADE)
    duration = models.IntegerField()
    amplitude = models.IntegerField()
    order = models.IntegerField()
    
# # TODO check, dass Fremdschlüssel zur selben Studie gehören und dass order innerhalb eines pattern nur einmal vorkommt
# class VibrationElementToPatternRef(models.Model):
#     id = models.AutoField(primary_key=True)
#     studyId = models.ForeignKey(Study, on_delete=models.CASCADE)
#     pattern = models.ForeignKey(VibrationPattern, on_delete=models.CASCADE)
#     element = models.ForeignKey(VibrationPatternElement, on_delete=models.CASCADE)
#     order = models.IntegerField()

class SectionToSectionElementRef(models.Model):
    id = models.AutoField(primary_key=True)
    studyId = models.ForeignKey(Study, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    sectionElement = models.ForeignKey(SectionElement, on_delete=models.CASCADE)
    order = models.IntegerField()
    isFixed = models.BooleanField(default=True)
    

class SectionOrder(models.Model):
    id = models.AutoField(primary_key=True)
    studyId = models.ForeignKey(Study, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    order = models.IntegerField()
    isFixed = models.BooleanField(default=True)




class SectionElementToStudyObjectRef(models.Model):
    id = models.AutoField(primary_key=True)
    studyId = models.ForeignKey(Study, on_delete=models.CASCADE)
    studyObject = models.ForeignKey(AbstractStudyObject, on_delete=models.CASCADE)
    sectionElement = models.ForeignKey(SectionElement, on_delete=models.CASCADE, related_name='SectionElementAsContainer')
    order = models.IntegerField()
    isFixed = models.BooleanField(default=True)

class MetaData(models.Model):
    id = models.AutoField(primary_key=True)
    brand = models.TextField()
    device = models.TextField()
    display = models.TextField()
    hardware = models.TextField()
    manufacturer = models.TextField()
    model = models.TextField()
    product = models.TextField()
    androidsdk = models.IntegerField()
    timeInMs = models.IntegerField()
    hasAmplitude = models.BooleanField()
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    study = models.ForeignKey(Study, on_delete=models.CASCADE)

class AuthToken(models.Model):
    key = models.CharField(_("Key"), max_length=40, primary_key=True)

    user = models.OneToOneField(
        User, related_name='auth_token',
        on_delete=models.CASCADE, verbose_name="User"
    )
    created = models.DateTimeField(_("Created"), auto_now_add=True)

    class Meta:
        verbose_name = _("Token")
        verbose_name_plural = _("Tokens")

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super(AuthToken, self).save(*args, **kwargs)

    def generate_key(self):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key