from enum import IntEnum

class PermissionTypes(IntEnum):
  PARTICIPANT =0
  CREATOR = 1
  ADMINISTRATOR = 2
  
  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]

class StudyStatus(IntEnum):
  CREATED = 0
  PUBLISHED = 1
  FINISHED = 2
  
  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]

class RandomizingStrategies(IntEnum):
  NONE = 0
  STANDARD = 1
  
  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]

class StudyObjectTypes(IntEnum):
  SECTION = 1
  SECTIONELEMENT = 2
  TEXTBLOCK = 3
  ABSTRACTQUESTION = 4
  VIBRATIONPATTERN = 5
  
  @classmethod
  def choices(cls):
    return [(key.value, key.name) for key in cls]
