from pydantic import BaseModel
from typing import Optional
from datetime import date


# -------------------------
# User
# -------------------------

class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "admin"


class UserResponse(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        from_attributes = True


# -------------------------
# Asset
# -------------------------

class AssetCreate(BaseModel):
    asset_id: Optional[str] = None
    serial_number: Optional[str] = None
    name: str
    type: str

    department: Optional[str] = None
    employee_name: Optional[str] = None
    location: Optional[str] = None

    purchase_date: Optional[date] = None
    status: str = "Active"


class AssetResponse(BaseModel):
    id: int
    asset_id: str
    serial_number: Optional[str] = None

    name: str
    type: str

    department: Optional[str] = None
    employee_name: Optional[str] = None
    location: Optional[str] = None

    purchase_date: Optional[date] = None
    status: str

    class Config:
        from_attributes = True


# -------------------------
# Ticket
# -------------------------

class TicketCreate(BaseModel):
    ticket_id: str

    service_type: Optional[str] = None
    title: str
    description: Optional[str] = None

    priority: str = "Medium"
    status: str = "Open"

    ticket_date: Optional[date] = None

    asset_id: Optional[int] = None


class TicketResponse(BaseModel):
    id: int
    ticket_id: str

    service_type: Optional[str] = None
    title: str
    description: Optional[str] = None

    priority: str
    status: str

    ticket_date: Optional[date] = None

    asset_id: Optional[int] = None

    class Config:
        from_attributes = True