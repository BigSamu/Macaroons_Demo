from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Text
from api.database import Base


class Resource(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True, onupdate=datetime.utcnow)

    def __repr__(self):
        return ("<Resource {self.id}, title: {self.title}>").format(self=self)
