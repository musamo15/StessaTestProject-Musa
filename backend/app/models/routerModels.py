from pydantic import BaseModel, Field
from typing import Optional, List

"""
    Represents the model for the addresses for the labels
    
    Field(...) specifies that the field is required
"""


class AddressModel(BaseModel):
    name: str = Field(...)
    street1: str = Field(...)
    street2: Optional[str]
    city: str = Field(...)
    state: str = Field(...)
    zip: str = Field(...)
    country: str = Field(...)


"""
    Parcel Models
"""


class ParcelModel(BaseModel):
    length: float = Field(...)
    width: float = Field(...)
    height: float = Field(...)
    weight: float = Field(...)


"""
    Rate Models
"""


class RateModel(BaseModel):
    id: str = Field(...)
    carrier: str = Field(...)
    service: str = Field(...)
    rate: str = Field(...)


"""
    Shipment Models
"""


class ShipMentModel(BaseModel):
    from_address_id: str = Field(...)
    to_address_id: str = Field(...)
    parcel_id: str = Field(...)


class ShipmentResponseModel(BaseModel):
    id: str = Field(...)
    rates: List[RateModel] = Field(...)


"""
    Label Models
"""


class RequestLabelModel(BaseModel):
    shipmentId: str = Field(...)
    rate: RateModel = Field(...)
