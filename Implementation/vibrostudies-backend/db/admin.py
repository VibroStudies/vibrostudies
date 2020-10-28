from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Study)
admin.site.register(AbstractStudyObject)
admin.site.register(QualificationQuestion)
admin.site.register(DateQuestion)
admin.site.register(LinearScaleQuestion)
admin.site.register(MultipleChoiceQuestion)
admin.site.register(TextQuestion)
admin.site.register(TextBlock)
admin.site.register(Section)
admin.site.register(SectionElement)
admin.site.register(ReferenceTuple)
admin.site.register(VibrationPatternElement)
admin.site.register(VibrationPattern)