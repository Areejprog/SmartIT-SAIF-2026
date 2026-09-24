from sqlalchemy import Column, Integer, String, Text, DateTime, Date, ForeignKey
from sqlalchemy.sql import func

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), default="admin")


class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)

    # Basic device identification
    asset_id = Column(String(50), unique=True, nullable=False)
    serial_number = Column(String(150), unique=True, nullable=True)
    name = Column(String(150), nullable=False)
    type = Column(String(100), nullable=False)

    # Organizational information
    department = Column(String(150), nullable=True)
    employee_name = Column(String(150), nullable=True)
    location = Column(String(150), nullable=True)

    # Device lifecycle information
    purchase_date = Column(Date, nullable=True)

    # Current device status
    status = Column(String(50), default="Active")

    created_at = Column(DateTime, server_default=func.now())


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)

    # Ticket identification
    ticket_id = Column(String(50), unique=True, nullable=False)

    # Service information
    service_type = Column(String(150), nullable=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)

    # Ticket classification
    priority = Column(String(50), default="Medium")
    status = Column(String(50), default="Open")

    # Date of service request
    ticket_date = Column(Date, nullable=True)

    # Link ticket to the affected device
    asset_id = Column(
        Integer,
        ForeignKey("assets.id"),
        nullable=True
    )

    created_at = Column(DateTime, server_default=func.now())


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=True)
    action = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())